import json
from database_utils import DatabaseUtils
from mobileapp import MobileApp
from registrar import RegistrarAPI
import logging

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s: %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

"""
This file contains helper methods used in update_db_*.py scripts to update term and course data in the database.
"""

# Update course information for one term
# term: term code
def update_courses_for_one_term(term: str) -> None:
    db = DatabaseUtils()

    if not db.is_valid_term_code(code=term):
        logger.error(f"invalid term code {term} provided")
        return

    # get course data from mobileapp api
    try:
        logger.info(f"getting course data for term {term} from mobileapp")
        all_courses = MobileApp().get_all_courses(term)
    except Exception as e:
        logger.error(
            f"unable to get course data for term {term} from mobileapp with error {e}"
        )
        return

    # NOTE: it may be possible that courses can be deleted, instructors
    # removed from a course. only do two clearing operations below
    # if confident that update for all courses will not fail.
    # db.clear_courses_for_one_term(term)
    # db.clear_courses_for_instructor_for_one_term(term)

    logger.info(f"started updating courses for term {term}")
    for subject in all_courses:
        dept = subject["code"]

        logger.info(f"processing courses for {dept}")
        for mapp_course in subject["courses"]:
            guid = mapp_course["guid"]
            course_id = mapp_course["course_id"]

            # get course data from registrar's api
            try:
                logger.info(f"getting data for course {guid} from registrar's api")
                # NOTE: this operation slows down the script, but not sure
                # if it's worth optimizing because we will switch to OIT's
                # student API, where we can pull mobileapp & registrar api's
                # data at the same time
                reg_course = RegistrarAPI().get_course_data(term, course_id)
            except Exception as e:
                logger.error(
                    f"failed to get data for course {guid} from registrar's api with error {e}"
                )
                continue

            # update instructors collection with course guid
            if "instructors" in mapp_course:
                for instr in mapp_course["instructors"]:
                    try:
                        db.add_course_for_instructor(instr, guid)
                    except Exception as e:
                        logger.error(
                            f"failed to add course {guid} for instructor {instr['emplid']} with error {e}"
                        )

            try:
                data = {"term": term, "department": dept}
                data = parse_course_data(
                    res=data, mapp_course=mapp_course, reg_course=reg_course
                )

                # update courses collection with course data
                db.update_course_data(guid, data)
            except Exception as e:
                logger.error(
                    f"failed to parse & update course data for course {guid} with error {e}"
                )


# Combines MobileApp and Registrar's API data into one dictionary
# res = resulting dictionary to store data into
# mapp_course = raw data returned by MobileApp
# reg_course = raw data returned by Registrar
def parse_course_data(res: dict, mapp_course: json, reg_course: json) -> dict:
    res.update(parse_mobileapp_course_data(mapp_course))
    res.update(parse_registrar_course_data(reg_course))
    return res


# Parse raw course data returned by MobileApp API
# course = json returned by API
def parse_mobileapp_course_data(course: json) -> dict:

    data = {}
    data["course_id"] = course.get("course_id", None)
    data["guid"] = course.get("guid", None)
    data["title"] = course.get("title", None)
    data["catalog_number"] = course.get("catalog_number", None)
    data["crosslistings"] = course.get("crosslistings", [])
    data["classes"] = course.get("classes", [])

    # change to use get()
    if "detail" in course:
        details = course["detail"]
        data["description"] = details.get("description", None)
        data["track"] = details.get("track", None)

    return data


# Parse raw course data returned by Registrar's API
# course = json returned by API
# Adapted from Princeton Course's importBasicCourseDetails.js script
# https://github.com/PrincetonUSG/PrincetonCourses/blob/master/importers/importBasicCourseDetails.js#L131
def parse_registrar_course_data(course: json) -> dict:

    # Mappings copied from Princeton Course's importBasicCourseDetails.js script
    # https://github.com/PrincetonUSG/PrincetonCourses/blob/9fd073f9ad80306afe6646aa7aea9f16586d6a59/importers/importBasicCourseDetails.js#L28-L46
    GRADING_LABELS = {
        "grading_mid_exam": "Mid term exam",
        "grading_paper_mid_exam": "Paper in lieu of mid term",
        "grading_final_exam": "Final exam",
        "grading_paper_final_exam": "Paper in lieu of final",
        "grading_other_exam": "Other exam",
        "grading_home_mid_exam": "Take home mid term exam",
        "grading_design_projects": "Design project",
        "grading_home_final_exam": "Take home final exam",
        "grading_prog_assign": "Programming assignments",
        "grading_quizzes": "Quizzes",
        "grading_lab_reports": "Lab reports",
        "grading_papers": "Papers",
        "grading_oral_pres": "Oral presentation(s)",
        "grading_term_papers": "Term paper(s)",
        "grading_precept_part": "Class/precept participation",
        "grading_prob_sets": "Problem set(s)",
        "grading_other": "Other (see instructor)",
    }

    # https://github.com/PrincetonUSG/PrincetonCourses/blob/9fd073f9ad80306afe6646aa7aea9f16586d6a59/importers/importBasicCourseDetails.js#L182-L224
    GRADING_BASIS_MAPPINGS = {
        "FUL": {  # Graded A-F, P/D/F, Audit (also the Default)
            "pdf": {"required": False, "permitted": True},
            "audit": True,
        },
        "NAU": {  # No Audit
            "pdf": {"required": False, "permitted": True},
            "audit": False,
        },
        "GRD": {  # na, npdf
            "pdf": {"required": False, "permitted": False},
            "audit": False,
        },
        "NPD": {"pdf": {"required": False, "permitted": False}, "audit": True},  # npdf
        "NPD": {  # P/D/F only
            "pdf": {"required": True, "permitted": True},
            "audit": True,
        },
    }

    data = {}

    # parse reading list
    data["readings"] = []
    reading_list_title_keys = [k for k in course if k.startswith("reading_list_title_")]
    for title_k in reading_list_title_keys:
        ind = int(title_k.split("reading_list_title_")[1])
        author_k = f"reading_list_author_{ind}"
        if course[title_k].strip() == "" and course[author_k].strip() == "":
            continue
        data["readings"].append({"title": course[title_k], "author": course[author_k]})

    # parse grading breakdown
    data["grading"] = {}
    grading_keys = [k for k in course if k.startswith("grading_")]
    for k in grading_keys:
        if k in GRADING_LABELS and int(course[k]) != 0:
            data["grading"][GRADING_LABELS[k]] = int(course[k])

    # prase grading basis
    if "grading_basis" in course:
        grading_basis = course["grading_basis"]
        if grading_basis not in GRADING_BASIS_MAPPINGS:
            grading_basis = "FUL"
        data["pdf"] = GRADING_BASIS_MAPPINGS[grading_basis]["pdf"]
        data["audit"] = GRADING_BASIS_MAPPINGS[grading_basis]["audit"]

    # parse seating reservations
    k = "seat_reservations"
    data[k] = []
    if "seat_reservation" in course[k]:
        data[k] = course[k]["seat_reservation"]

    # parse other data
    data["other_restrictions"] = course.get("other_restrictions", None)
    data["other_information"] = course.get("other_information", None)
    data["distribution"] = course.get("distribution_area_short", None)
    data["crosslistings_title"] = course.get("crosslistings", None)
    data["website"] = course.get("web_address", None)
    data["assignments"] = course.get("reading_writing_assignment", None)

    return data


if __name__ == "__main__":
    update_courses_for_one_term(term="1224")
