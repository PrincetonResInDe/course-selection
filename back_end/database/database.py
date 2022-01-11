# methods to construct database from scratch
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from mobileapp import MobileApp
from sys import stderr

load_dotenv()

# Handles populating databases
class Database:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGO"))
        self.db = self.client.course_selection

    def get_db(self):
        return self.db

    # return list of term codes from semesters collection
    def get_all_terms(self):
        try:
            terms_dict = list(self.db.semesters.find({}, {"code": 1, "_id": 0}))
            terms = []
            for term in terms_dict:
                terms.append(term["code"])
            return terms
        except:
            print("failed to get all terms from semesters collection", file=stderr)

    # remove one term's courses from courses collection
    def clear_courses_for_one_term(self, term):
        try:
            self.db.courses.delete_many({"term": term})
        except:
            print(f"failed to clear courses for term {term}", file=stderr)

    # remove one term's courses for instructors in instructors collection
    def clear_courses_for_instructor_for_one_term(self, term):
        try:
            self.db.instructors.update_many(
            {}, {"$pull": {"courses": {"$regex": r"^" + term}}})   
        except:
            print(f"failed to clear all instructor's courses for term {term}", file=stderr)

    # add a course for an instructor in instructors collection
    def add_course_for_instructor(self, instr, guid):
        try:
            emplid = instr["emplid"]
            self.db.instructors.update_one(
                {"emplid": emplid},
                {
                    "$set": {
                        "name": {
                            "first_name": instr["first_name"],
                            "last_name": instr["last_name"],
                        }
                    },
                    "$addToSet": {"courses": guid},
                },
                upsert=True
            )
        except:
            print(f"failed to add course for instructor", file=stderr)     

    # add current term data to semesters collection (does nothing if term already exists)
    def add_current_term(self, data):
        try:
            self.db.semesters.update_one(
                {"code": data["code"]}, {"$set": data}, upsert=True
            )
        except:
            print(f"failed to add current term data to semester collection", file=stderr)

    # update data for course (inserts course if doesn't exist)
    def update_course_data(self, guid, data):
        try: 
            self.db.courses.update_one({"guid": guid}, {"$set": data}, upsert=True)
        except:
            print(f"failed to update course data for {guid}", file=stderr)



if __name__ == "__main__":
    db = Database()
