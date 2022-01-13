from pymongo import MongoClient
from dotenv import load_dotenv
import os
from typing import List
import logging
import certifi

load_dotenv()

logging.basicConfig(format='%(asctime)s - %(levelname)s - %(name)s: %(message)s', datefmt='%m/%d/%Y %H:%M:%S', level=logging.INFO)
logger = logging.getLogger(__name__)

"""
    This class handles querying from and updating the database. 
    Database methods that serve the API are contained in the DatabaseAPI class.
"""
class DatabaseUtils:

    def __init__(self) -> None:
        self.connect()

    def connect(self):
        self.client = MongoClient(os.getenv("MONGO"), tlsCAFile=certifi.where())
        self.db = self.client.course_selection

    def get_db(self):
        return self.db

    # return list of term codes from semesters collection
    def get_all_terms(self) -> List[str]:
        try:
            terms_dict = list(self.db.semesters.find({}, {"code": 1, "_id": 0}))
            terms = []
            for term in terms_dict:
                terms.append(term["code"])
            return terms
        except:
            logger.error("failed to get all terms from semesters collection")

    # remove one term's courses from courses collection
    def clear_courses_for_one_term(self, term: str) -> None:
        try:
            self.db.courses.delete_many({"term": term})
        except:
            logger.error(f"failed to clear courses for term {term}")

    # remove one term's courses for instructors in instructors collection
    def clear_courses_for_instructor_for_one_term(self, term: str) -> None:
        try:
            self.db.instructors.update_many(
                {}, {"$pull": {"courses": {"$regex": r"^" + term}}}
            )
        except:
            logger.error(
                f"failed to clear all instructor's courses for term {term}"
            )

    # add a course for an instructor in instructors collection
    def add_course_for_instructor(self, instr: dict, guid: str) -> None:
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
                upsert=True,
            )
        except:
            logger.error(f"failed to add course {guid} for instructor {instr['emplid']}")

    # add current term data to semesters collection (does nothing if term already exists)
    def add_current_term(self, data: dict) -> None:
        try:
            self.db.semesters.update_one(
                {"code": data["code"]}, {"$set": data}, upsert=True
            )
        except:
            logger.error(
                "failed to add current term data to semesters collection"
            )

    # update data for course (inserts course if doesn't exist)
    def update_course_data(self, guid: str, data: dict) -> None:
        try:
            self.db.courses.update_one({"guid": guid}, {"$set": data}, upsert=True)
        except:
            logger.error(f"failed to update course data for {guid}")


if __name__ == "__main__":
    db = DatabaseUtils()    
