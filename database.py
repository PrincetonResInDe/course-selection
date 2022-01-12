from pymongo import MongoClient
from dotenv import load_dotenv
import logging
import os
import certifi

load_dotenv()

logging.basicConfig(format='%(asctime)s - %(levelname)s - %(name)s -   %(message)s', datefmt='%m/%d/%Y %H:%M:%S',
                    level=logging.INFO)
logger = logging.getLogger(__name__)

"""
    This file creates an Database object that handles all things related to the database.
    This might include querying from or inserting information into the database.
    Logic regarding the database should go into this file.
"""

class Database:

    def __init__(self):
        self.connect()
        self.db_test = self.client.test

    def connect(self):
        self.client = MongoClient(os.getenv("MONGO"), tlsCAFile=certifi.where())
        self.db = self.client.admin
        logger.info(f"MongoDB server status: {self.db.command('serverStatus')}")

    def as_list(self, cursor):
        return [a for a in cursor]

    def get_all_test(self):
        # note that when you are returning, you want it to be jsonify-able,
        # which means that all fields either have to be a str or a int/float
        # it will cause an error if some values are of type ObjectId which
        # are return by default that are created by mongo
        # you can specify which field to return or not to return in the second dict
        # you send to the db
        logger.info("Queried for all people in test database.")
        return self.as_list(self.db_test.people.find({}, {"_id": 0}))

    def close(self):
        self.client.close()

if __name__ == "__main__":
    # a basic example of how to use, can remove later
    db = Database()
    logger.info(db.get_all_test())
    db.close()
