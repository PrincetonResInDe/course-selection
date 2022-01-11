from database import Database
from sys import stderr
from multiprocessing import Pool
from mobileapp import MobileApp
import os

 # add current term data to semesters collection (ignores if already exists)
def add_current_term():
    db = Database()
    try:
        data = MobileApp().get_current_term_data()
        new_data = {
            "code": data["code"],
            "name": data["cal_name"],
            "start_date": data["start_date"],
            "end_date": data["end_date"],
        }
        db.add_current_term(new_data)
    except:
        print("unable to update current term data", file=stderr)

# update course info for single term
# collections updated: courses, instructors
def update_courses_for_one_term(term):
    db = Database()

    try:
        print(f"getting courses for term {term} from mobileapp")
        all_courses = MobileApp().get_all_courses(term)
    except:
        print(f"unable to get courses for term {term} from mobileapp", file=stderr)
        return

    # only delete from courses collection if courses can be removed from api
    # db_wrapper.clear_courses_for_one_term(term)
    db.clear_courses_for_instructor_for_one_term(term)

    print(f"started updating courses for term {term}")
    for subject in all_courses:
        dept = subject["code"]
        print(f"inserting courses for {dept}")
        for course in subject["courses"]:
            try:
                data = {} # one course's data

                # if possible that course data is duplicated in all_courses, 
                # add check here that a course has not been updated

                guid = course["guid"]
                data["guid"] = guid
                data["term"] = term
                data["department"] = dept
                data["course_id"] = course["course_id"]
                data["title"] = course["title"]
                data["catalog_number"] = course["catalog_number"]

                details = course["detail"]
                data["description"] = details["description"]
                data["track"] = details["track"]
                data["seat_reservations"] = details["seat_reservations"]

                # update instructors collection with course guid
                for instr in course["instructors"]:
                    db.add_course_for_instructor(instr, guid)

                data["crosslistings"] = course["crosslistings"]
                data["classes"] = course["classes"]

                # update courses collection with course data
                db.update_course_data(guid, data)
            except:
                print(f"failed to update course & instructors data for course {guid} in term {term}")


# add course info in db for current term
def update_courses_for_current_term():
    try:
        curr_term = MobileApp().get_current_term_code()
        update_courses_for_one_term(curr_term)
    except:
        print("failed to update courses for current term", file=stderr)

# update course info in db for all terms
# DO NOT RUN: CURRENTLY CRASHES MID-WAY DUE TO MOBILEAPP TIMEOUT ERROR
# TO-DO: work witb OIT about timeout issue
def update_courses_for_all_terms():
    db = Database()
    try:
        terms = db.get_all_terms()
        print("updating courses for all terms")
        with Pool(os.cpu_count()) as pool:
            pool.map(update_courses_for_one_term, terms)
    except:
        print("failed to add courses for all terms", file=stderr)

if __name__ == "__main__":
    # clear courses, instructors collections
    # db.courses.delete_many({})
    # db.instructors.delete_many({})

    update_courses_for_one_term("1204")
