import requests
import json
from bs4 import BeautifulSoup

# Handles requests to Registrar's API
# TO-DO: Retire code once OIT provides Registrar's API data in a student API
class RegistrarAPI:
    def __init__(self):
        self.api_token = self._generate_token()

    # Adapted from Princeton Course's getRegistrarFrontEndAPIToken()
    # https://github.com/PrincetonUSG/PrincetonCourses/blob/9fd073f9ad80306afe6646aa7aea9f16586d6a59/importers/importBasicCourseDetails.js#L310-L320
    def _generate_token(self):
        response = requests.get("https://registrar.princeton.edu/course-offerings")
        soup = BeautifulSoup(response.text, "html.parser")
        text = soup.find(
            attrs={"data-drupal-selector": "drupal-settings-json"}
        ).get_text()
        return json.loads(text)["ps_registrar"]["apiToken"]

    # exploit registrar api's vulnerability to make request for course data
    def _make_course_request(self, term: str, course_id: str):
        USER_AGENT = "resinde-course-selection"
        url = f"https://api.princeton.edu/registrar/course-offerings/course-details?term={term}&course_id={course_id}"
        bearer = f"Bearer {self.api_token}"
        headers = {"Authorization": bearer, "User-Agent": USER_AGENT}

        return requests.get(url, headers=headers)

    # wrapper method to get data from registrar's api for specified term & course
    def get_course_data(self, term: str, course_id: str) -> json:
        response = self._make_course_request(term, course_id)

        # regenerate api token if request fails first time
        if response.status_code != 200:
            self.api_token = self._generate_token()
            response = self._make_course_request(term, course_id)

        data = response.json()["course_details"]["course_detail"][0]
        return data


if __name__ == "__main__":
    api = RegistrarAPI()

    # COS126: grading, prereqs, no seat reservations
    print(api.get_course_data("1224", "002051"))

    # VIS213: seat reservations, NPDF, website
    print(api.get_course_data("1224", "008907"))

    # CEE102A: older term, 2 readings
    print(api.get_course_data("1222", "008721"))
