from pymongo import MongoClient
from dotenv import load_dotenv
import logging
import os
import certifi

load_dotenv()

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s -   %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

"""
    This file creates an Database object that handles all things related to the database.
    This might include querying from or inserting information into the database.
    Logic regarding the database should go into this file.
"""


class DatabaseAPI:
    def __init__(self):
        self.connect()
        self.db_test = self.client.test
        self.db = self.client.course_selection

    def connect(self):
        self.client = MongoClient(os.getenv("MONGO"), tlsCAFile=certifi.where())
        self.db_admin = self.client.admin
        logger.info(f"MongoDB server status: {self.db_admin.command('serverStatus')}")

    def get_all_test(self):
        # note that when you are returning, you want it to be jsonify-able,
        # which means that all fields either have to be a str or a int/float
        # it will cause an error if some values are of type ObjectId which
        # are return by default that are created by mongo
        # you can specify which field to return or not to return in the second dict
        # you send to the db
        logger.info("Querying for all people in test database.")
        try:
            ret = list(self.db_test.people.find({}, {"_id": 0}))
        except Exception as e:
            logger.error(
                f"Failed to query for all people in test database with error {e}"
            )
            ret = None
        return ret

    def close(self):
        self.client.close()

    """
        This is how input dict query should be structured.
        query = {
            "string": "the query string",
            "semester": "one of the semester",
            "sort": "Course Code, Relevance, Rating, Title",
            "filters": {
                "special": "*" or "NEW",
                "dist": [list of dist codes],
                "grading": [list of grading categorise],
                "level": [list of levels],
                "depts": [list of dept codes]
            }
        }
    """

    def search(self, query: dict) -> dict:

        string = query["string"]
        semester = query["semester"]

        query_filters = query["filters"]
        special = query_filters["special"]
        dists = query_filters["dists"]
        grading = query_filters["grading"]
        levels = query_filters["levels"]
        depts = query_filters["depts"]
        # sort = query.sort

        # Filters passed into MongoDB query to get courses
        course_filters = {"$and": []}
        # Filters passed into MongoDB query to get instructors
        instr_filters = {}

        # Assume semester is passed in as "[Fall/Spring/Summer] [Year]"
        course_filters["$and"].append(
            {
                "term": self.db.semesters.find_one(
                    {"name": semester}, {"_id": 0, "code": 1}
                )["code"]
            }
        )

        # Flag used to determine whether we query for courses
        # Remains False if no filters are set AND no query string entered
        get_courses = False

        # Assume special options are "*" (all courses), "NEW" (new courses)
        # Assume only one option can be selected
        if special == "*":
            get_courses = True
        elif special == "NEW":
            get_courses = True
            # TO-DO: implement getting NEW courses

        # Assume selected distribution codes are passed in as list
        # e.g. 'CD', 'EC', ...
        DIST_EQUIVALENTS = {
            "QCR": "QR",
            "SEL": "STL",
            "SEN": "STN",
        }
        if len(dists) > 0:
            get_courses = True
            all_dists = []
            for dist in dists:
                if dist in DIST_EQUIVALENTS:
                    # regex handles courses with multiple distributions, e.g. "CD or SA"
                    all_dists.append(
                        {"distribution": {"$regex": DIST_EQUIVALENTS[dist]}}
                    )
                all_dists.append({"distribution": {"$regex": dist}})
            course_filters["$and"].append({"$or": all_dists})

        # Assume selected department codes are passed in as list
        # e.g. 'AAS', 'COS', ...
        if len(depts) > 0:
            get_courses = True
            course_filters["$and"].append(
                {
                    "$or": [
                        {"department": {"$in": depts}},
                        {"crosslistings.subject": {"$in": depts}},
                    ]
                }
            )

        # Assume selected levels are passed in as list
        # Based on Princeton Courses, options are [1-5]XX, UGRD, GRAD
        if len(levels) > 0:
            get_courses = True
            tracks, catalog_nums = [], []
            for level in levels:
                if level in ["UGRD", "GRAD"]:
                    tracks.append(level)
                else:
                    pattern = {"$regex": r"^" + level[0]}
                    catalog_nums.extend(
                        [
                            {"catalog_number": pattern},
                            {"crosslistings.catalog_number": pattern},
                        ]
                    )

            if len(tracks) > 0:
                course_filters["$and"].append({"track": {"$in": tracks}})

            if len(catalog_nums) > 0:
                course_filters["$and"].append({"$or": catalog_nums})

        # Assume selected grading is passed in as list
        # Based on Princeton Courses, options are PDF, PDFO, or NPDF (for PDF)
        # or AUDIT, NAUDIT (for AUDIT)
        # Assume only one PDF option, one AUDIT option can be selected
        PDF_MAPPINGS = {
            "PDF": {"required": False, "permitted": True},
            "PDFO": {"required": True, "permitted": True},
            "NPDF": {"required": False, "permitted": False},
        }

        AUDIT_MAPPINGS = {"AUDIT": True, "NAUDIT": False}

        if len(grading) > 0:
            get_courses = True
            pdf, audit = None, None
            for code in grading:
                if code in PDF_MAPPINGS.keys():
                    pdf = PDF_MAPPINGS[code]
                elif code in AUDIT_MAPPINGS.keys():
                    audit = AUDIT_MAPPINGS[code]

            if pdf is not None:
                course_filters["$and"].append({"pdf": pdf})

            if audit is not None:
                course_filters["$and"].append({"audit": audit})

        # Search by course code + number, title, or instructor
        if string != "":
            get_courses = True
            course_filters["$and"].append(
                {
                    "$or": [
                        {"title": {"$regex": string, "$options": "i"}},
                        {
                            "catalog_title": {
                                "$regex": string.replace(" ", ""),
                                "$options": "i",
                            }
                        },
                    ]
                }
            )

            names = string.split(" ")
            names = list(
                map(lambda name: {"$regex": r"^" + name, "$options": "i"}, names)
            )
            instr_filters["$or"] = []
            for name in names:
                instr_filters["$or"].extend(
                    [{"name.first_name": name}, {"name.last_name": name},]
                )

        if not get_courses:
            return []

        # For debugging search tests:
        # print("== Course Filters: ==")
        # print(course_filters)
        # print("== Instructor Filters: ==")
        # print(instr_filters)

        course_res = self.db.courses.find(course_filters)
        instr_res = self.db.instructors.find(instr_filters)

        # TO-DO: do sort after retrieving results
        # TO-DO: return course information for each instructor retrieved

        # result[0] is list of courses, result[1] is list of instructors
        return [list(course_res), list(instr_res)]


if __name__ == "__main__":
    # a basic example of how to use, can remove later
    import copy

    db = DatabaseAPI()

    """
        query = {
            "string": "the query string",
            "semester": "one of the semester",
            "sort": "Course Code, Relevance, Rating, Title",
            "filters": {
                "special": "*" or "NEW",
                "dist": [list of dist codes],
                "grading": [list of grading categorise],
                "level": [list of levels],
                "depts": [list of dept codes]
            }
        }
    """

    empty_query = {
        "string": "",
        "semester": "Spring 2022",
        "filters": {
            "special": "",
            "dists": [],
            "grading": [],
            "levels": [],
            "depts": [],
        },
    }

    # For debugging search tests
    def call_search(get_course, get_instr):
        res = db.search(query)
        if get_course:
            print("# Courses returned:", len(res[0]))
        if get_instr:
            print("# Instructors returned:", len(res[1]))

    print("NO QUERY")
    query = copy.deepcopy(empty_query)
    print("# courses returned:", len(db.search(query)))

    print("\nALL COURSES")
    query = copy.deepcopy(empty_query)
    query["filters"]["special"] = "*"
    call_search(True, False)

    print("\nSET DISTRIBUTIONS")
    query = copy.deepcopy(empty_query)
    query["filters"]["dists"] = ["CD", "QCR", "SEL", "SEN"]
    call_search(True, False)

    print("\nSET LEVELS")
    query = copy.deepcopy(empty_query)
    query["filters"]["levels"] = ["1XX", "5XX", "UGRD", "GRAD"]
    call_search(True, False)

    print("\nSET GRADING")
    query = copy.deepcopy(empty_query)
    query["filters"]["grading"] = ["PDFO", "AUDIT"]
    call_search(True, False)

    print("\nSET DEPTS")
    query = copy.deepcopy(empty_query)
    query["filters"]["depts"] = ["AAS", "COS", "NEU"]
    call_search(True, False)

    print("\nQUERY FOR COURSE (CODE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "COS 126"
    call_search(True, True)

    print("\nQUERY FOR COURSE (CODE) - CASE INSENSITIVE")
    query = copy.deepcopy(empty_query)
    query["string"] = "cos 126"
    call_search(True, True)

    print("\nQUERY FOR CROSS-LISTED COURSE (CODE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "EGR 126"
    call_search(True, True)

    print("\nQUERY FOR COURSE (CODE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "202"
    call_search(True, True)

    print("\nQUERY FOR COURSE (TITLE)")
    query = copy.deepcopy(empty_query)
    query["string"] = "Race"
    call_search(True, True)

    print("\nQUERY FOR COURSE (TITLE) - CASE INSENSITIVE")
    query = copy.deepcopy(empty_query)
    query["string"] = "rAcE"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS")
    query = copy.deepcopy(empty_query)
    query["string"] = "Kevin"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS - CASE INSENSITIVE")
    query = copy.deepcopy(empty_query)
    query["string"] = "keViN"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS")
    query = copy.deepcopy(empty_query)
    query["string"] = "Wayne"
    call_search(True, True)

    print("\nQUERY FOR INSTRUCTORS - TWO NAMES")
    query = copy.deepcopy(empty_query)
    query["string"] = "kevin wayne"
    call_search(True, True)

    print("\nSET MULTIPLE FILTERS")
    query = copy.deepcopy(empty_query)
    query["string"] = "Race"
    query["filters"]["depts"] = ["AAS"]
    query["filters"]["dists"] = ["SA", "HA"]
    query["filters"]["grading"] = ["NPDF"]
    query["filters"]["levels"] = ["3XX"]
    call_search(True, False)

    logger.info(db.get_all_test())
    db.close()
