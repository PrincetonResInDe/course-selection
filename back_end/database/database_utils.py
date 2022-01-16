from pymongo import MongoClient
from dotenv import load_dotenv
import os
from typing import List
import logging
import certifi

load_dotenv()

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s: %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

"""
    This class handles connecting to, querying from, and updating the database. 

    Database methods that serve the API are contained in the DatabaseAPI class (database_api.py).
"""


class DatabaseUtils:
    def __init__(self) -> None:
        self.connect()

    def connect(self):
        self.client = MongoClient(os.getenv("MONGO"), tlsCAFile=certifi.where())
        self.db = self.client.course_selection

    def get_db(self):
        return self.db

    # Return list of term codes from semesters collection
    def get_all_terms(self) -> List[str]:
        terms_dict = list(self.db.semesters.find({}, {"code": 1, "_id": 0}))
        terms = []
        for term in terms_dict:
            terms.append(term["code"])
        return terms

    # Remove one term's courses from courses collection
    # term = term code
    def clear_courses_for_one_term(self, term: str) -> None:
        try:
            self.db.courses.delete_many({"term": term})
        except Exception as e:
            logger.error(f"failed to clear courses for term {term} with error {e}")

    # Remove one term's courses for instructors in instructors collection
    # term = term code
    def clear_courses_for_instructor_for_one_term(self, term: str) -> None:
        try:
            self.db.instructors.update_many(
                {}, {"$pull": {"courses": {"$regex": r"^" + term}}}
            )
        except Exception as e:
            logger.error(
                f"failed to clear all instructor's courses for term {term} with error {e}"
            )

    # Add course for an instructor in instructors collection
    # instr = data about instructor (emplid, first name, last name)
    # guid = course guid
    def add_course_for_instructor(self, instr: dict, guid: str) -> None:
        self.db.instructors.update_one(
            {"emplid": instr["emplid"]},
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

    # Update current term data in semesters collection
    # data = new term data
    def update_current_term(self, data: dict) -> None:
        self.db.semesters.update_one(
            {"code": data["code"]}, {"$set": data}, upsert=True
        )

    # Update data for course in courses collection
    # guid = course guid, data = new course data
    def update_course_data(self, guid: str, data: dict) -> None:
        try:
            self.db.courses.update_one({"guid": guid}, {"$set": data}, upsert=True)
        except Exception as e:
            logger.error(f"failed to update course data for {guid} with error {e}")

    # Update evaluations data in evaluations collection
    # guid = course guid, data = new eval data
    def update_evals_data(self, guid: str, data: dict) -> None:
        try:
            self.db.evaluations.update_one({"guid": guid}, {"$set": data}, upsert=True)
        except Exception as e:
            logger.error(f"failed to update evals data for {guid} with error {e}")

    # Check if term code exists in semesters collection
    # code = term code
    def is_valid_term_code(self, code: str) -> bool:
        return self.db.semesters.find_one({"code": code}) is not None


if __name__ == "__main__":
    db = DatabaseUtils()
