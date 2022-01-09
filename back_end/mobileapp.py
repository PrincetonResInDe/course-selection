# Adapted from vr2amesh's COS333 API Code Examples
# https://github.com/vr2amesh/COS333-API-Code-Examples/tree/434acaf21bce6bf894df65435998247ae63e83e2/MobileApp/python

import requests
import json
import base64
from dotenv import load_dotenv
import os
from sys import stderr

load_dotenv()

class MobileAppBase:

    def __init__(self):
        self.configs = MobileAppConfigs()

    '''
    This function allows a user to make a request to 
    a certain endpoint, with the BASE_URL of 
    https://api.princeton.edu:443/mobile-app/1.0.3
    The parameters kwargs are keyword arguments. It
    symbolizes a variable number of arguments 
    '''
    def getJSON(self, endpoint, **kwargs):
        req = requests.get(
            self.configs.BASE_URL + endpoint, 
            params=kwargs if "kwargs" not in kwargs else kwargs["kwargs"], 
            headers={
                "Authorization": "Bearer " + self.configs.ACCESS_TOKEN
            },
        )
        text = req.text

        # Check to see if the response failed due to invalid
        # credentials
        text = self._updateConfigs(text, endpoint, **kwargs)

        return json.loads(text)
    
    def _updateConfigs(self, text, endpoint, **kwargs):
        if text.startswith("<ams:fault"):
            self.configs._refreshToken(grant_type="client_credentials")

            # Redo the request with the new access token
            req = requests.get(
                self.configs.BASE_URL + endpoint, 
                params=kwargs if "kwargs" not in kwargs else kwargs["kwargs"], 
                headers={
                    "Authorization": "Bearer " + self.configs.ACCESS_TOKEN
                },
            )
            text = req.text

        return text

class MobileAppConfigs:
    def __init__(self):
        self.CONSUMER_KEY = os.getenv("CONSUMER_KEY")
        self.CONSUMER_SECRET = os.getenv("CONSUMER_SECRET")
        self.BASE_URL="https://api.princeton.edu:443/mobile-app/1.0.3"
        self.COURSE_COURSES="/courses/courses"
        self.COURSE_SEATS="/courses/seats"
        self.COURSE_TERMS="/courses/terms"
        self.DINING_LOCATIONS="/dining/locations"
        self.DINING_EVENTS="/dining/events"
        self.DINING_MENU="/dining/menu"
        self.PLACES_OPEN="/places/open"
        self.EVENTS_EVENTS="/events/events"
        self.REFRESH_TOKEN_URL="https://api.princeton.edu:443/token"
        self._refreshToken(grant_type="client_credentials")

    def _refreshToken(self, **kwargs):
        req = requests.post(
            self.REFRESH_TOKEN_URL, 
            data=kwargs, 
            headers={
                "Authorization": "Basic " + base64.b64encode(bytes(self.CONSUMER_KEY + ":" + self.CONSUMER_SECRET, "utf-8")).decode("utf-8")
            },
        )
        text = req.text
        response = json.loads(text)
        self.ACCESS_TOKEN = response["access_token"]
    
class MobileApp:
    def __init__(self):
        self.api = MobileAppBase()
        self.configs = self.api.configs

    def get_current_term(self):
        return self.api.getJSON(self.configs.COURSE_TERMS, fmt="json")

    def get_current_term_code(self):
        try:
            return self.get_current_term()["term"][0]["code"]
        except:
            print("failed to get current term code from mobileapp", file=stderr)

    # return department codes as comma-separated string
    def get_department_codes(self):
        try: 
            term = self.get_current_term_code()
            depts = self.api.getJSON(
                self.configs.COURSE_COURSES, 
                term=term, subject="list", fmt="json")

            dept_codes = []
            for dept in depts["term"][0]["subjects"]:
                dept_codes.append(dept["code"])
            return ",".join(dept_codes)
        except:
            print("failed to get all department codes from mobileapp", file=stderr)
    
    # return all courses as dict 
    # (key = dept code, value = list of courses and their info in the dept)
    def get_all_courses(self, term):
        try: 
            dept_codes = self.get_department_codes()
            courses_raw = self.api.getJSON(
                self.configs.COURSE_COURSES, 
                term=term, subject=dept_codes, fmt="json")

            return courses_raw["term"][0]["subjects"]
        except:
            print("failed to get all courses from mobileapp", file=stderr)
    

if __name__ == "__main__":
    api = MobileApp()
    curr_term_code=api.get_current_term_code()
    print("current term code:", curr_term_code)
    print("dept codes:", api.get_department_codes())
    print("courses from this semester:", api.get_all_courses(term=curr_term_code))