import requests
import json
import base64

class Configs:
    def __init__(self):
        self.CONSUMER_KEY = "KPYMe2FTDdpk9Lo3Q0FLWPWCjwsa"
        self.CONSUMER_SECRET = "ONBGvpgskS6EKutumvlTf_kh56Ua"
        self.BASE_URL="https://api.princeton.edu:443/mobile-app"
        self.COURSE_COURSES="/courses/courses"
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


class ReqLib:
    def __init__(self):
        self.configs = Configs()

    '''
    This function allows a user to make a request to
    a certain endpoint, with the BASE_URL of
    https://api.princeton.edu:443/mobile-app
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

    def getXMLorTXT(self, endpoint, **kwargs):
        req = requests.get(
                self.configs.BASE_URL + endpoint,
                params=kwargs if "kwargs" not in kwargs else kwargs["kwargs"],
                headers={
                    "Authorization": "Bearer " + self.configs.ACCESS_TOKEN
                },
            )
        # Check to see if the response failed due to invalid
        # credentials
        text = self._updateConfigs(req.text, endpoint, **kwargs)
        return text

if __name__ == "__main__":
    req_lib = ReqLib()
    spring_2020_term_code = "1204"
    subj = "COS"

    # Returns all courses in COS
    term_info = req_lib.getJSON(
        req_lib.configs.COURSE_COURSES,
        # To return a json version of the return value
        fmt="json",
        term=spring_2020_term_code,
        subject=subj,
    )
    print(term_info)

    for term in term_info["term"]:
        for subject in term["subjects"]:
            for course in subject["courses"]:

                # prints each individual course returned
                # by the endpoint. Each course has the
                # following parameters:

                # guid (string of the term code and course id concatenated. Unique each term)
                # course_id (course id according to the course registrar. Not unique each term)
                # catalog_number (catalog number of the course. So, for COS 126 this would be 126)
                # title (Title of the course)
                # detail (detailed information about the course [start/end date, track, description])
                # instructors
                # crosslistings (any crosslistings, if they exist)
                # classes (class meetings, each section that is within the class)
                print(course)
