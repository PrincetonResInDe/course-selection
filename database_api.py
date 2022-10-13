from flask import jsonify
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
        self.client = MongoClient(os.getenv("MONGO"),
                                  tlsCAFile=certifi.where())
        self.db_admin = self.client.admin
        logger.info(
            f"MongoDB server status: {self.db_admin.command('serverStatus')}")

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

    def get_course_info(self, course_id, semester):
        """
        Retrieves course info from the database for a specific
        course_id, from a given semester

        Semester is of format Spring/Summer/Fall Year

        This information includes all course evaluation data across
        different terms for this course_id

        params: query = {
                            "course_id": "the course_id",
                            "semester = "semester_in_words"
                        }

        Example from COS 126, Fall 2021:
            query = { "course_id": "002051", "semester": "Fall 2021" }
        """
        if course_id == "":
            return [], []

        try:
            # Assume semester is passed in as "[Fall/Spring/Summer] [Year]"
            term_data = self.db.semesters.find_one(
                {"name": semester}, {"_id": 0, "code": 1}
            )
            if term_data is not None:
                term = term_data["code"]

            course_db = self.db.courses
            evals_db = self.db.evaluations
            course_query_string = {'course_id': course_id, 'term': term}
            course_res = course_db.find(course_query_string,
                                        {"_id": 0})
            eval_query_string = {'course_id': course_id}
            eval_res = evals_db.find(eval_query_string, {"_id": 0})
            course_res = list(course_res)
            eval_res = list(eval_res)
            ret = course_res + eval_res
        except Exception as e:
            logger.error(
                f"Failed to get information for course_id {course_id}. "
                f"Error displayed below:\n{e}"
            )
            ret = None
        # Note, right now this returns a ton of information
        # If this information is difficult to use on the front end
        # This code can be modified going forward to meet this need
        return ret

    def close(self):
        self.client.close()


if __name__ == "__main__":
    # a basic example of how to use, can remove later
    db = DatabaseAPI()
    logger.info(db.get_all_test())
    db.close()
