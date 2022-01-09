# methods to construct database from scratch
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from mobileapp import MobileApp
from sys import stderr

load_dotenv()

class ConnectDB:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGO"))

    def connect_to_course_selection(self):
        return self.client.course_selection 

class SetupDB:  
    def __init__(self):
        self.db = ConnectDB().connect_to_course_selection()

    # add current term data to semesters collection (ignores if already exists)
    def add_current_term(self):
        try:
            data = MobileApp().get_current_term_data()
            new_data = {"code": data["code"], "name": data["cal_name"], "start_date": data["start_date"], "end_date": data["end_date"]}
            self.db.semesters.update_one({"code": data["code"]}, {"$set": new_data}, upsert=True)
        except:
            print("unable to update current term in semesters collection", file=stderr)
    
    # add course info to courses collection for single term
    def add_courses_for_one_term(self, term):
        pass

    # add course info to courses collection for all terms
    def add_courses_for_all_terms(self):
        pass


if __name__ == "__main__":
    db = SetupDB()
    db.add_current_term()


