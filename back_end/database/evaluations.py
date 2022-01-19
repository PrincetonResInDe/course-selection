import requests
import browser_cookie3
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

load_dotenv()

"""
    This class handles scraping for course evaluations.

    INSTRUCTIONS: Before creating an EvalsScraper object, 
    make sure you are logged into CAS on one of the browsers supported by browser_cookie3
    (https://github.com/borisbabic/browser_cookie3). Or, you can 
    manually add a valid "PHPSESSID" token in your .env file.
"""


class EvalsScraper:
    def __init__(self):
        self.BASE_URL = "https://registrarapps.princeton.edu/course-evaluation?ssub={}&courseinfo={}&terminfo={}"
        self.USER_AGENT = "resinde-course-selection"

        headers = {"user-agent": self.USER_AGENT}

        # Set up the cookies for getting past CAS
        print("creating browser cookie obj...")
        cj = browser_cookie3.load(domain_name="registrarapps.princeton.edu")
        print("extracting cookies...")
        cookies = requests.utils.dict_from_cookiejar(cj)
        if "PHPSESSID" in cookies:
            cookies = {"PHPSESSID": cookies["PHPSESSID"]}
        else:
            cookies = {"PHPSESSID": os.getenv("PHPSESSID")}

        print("creating session...")
        session = requests.Session()
        session.cookies.update(cookies)
        session.headers.update(headers)
        self.session = session

    """
        Extracts term from evaluations page URL and validates that this term
        equals the expected term.
        Why? If a course does not have evals for a given term (but does have evals
        for other terms), then the evals page redirects to the evals page for the
        most recent evals possible. We want to check that the eval page returned
        by the scraper response is not a redirection, i.e. the evals returned are for the expected term.
        evals_url = url returned by scraper response
        term = expected term code
    """

    def _is_correct_term(self, evals_url, term):

        TERM_DELIMITER = "terminfo="
        TERM_CODE_LENGTH = 4
        TERM_START = evals_url.index(TERM_DELIMITER) + len(TERM_DELIMITER)
        term_from_url = evals_url[TERM_START : TERM_START + TERM_CODE_LENGTH]
        return term_from_url == term

    """
        Scrapes the evaluation for a specific course.
        Input:
            dept: department code
            course_id: course id
            term: term code
        Output:
            All the course evaluations as a dictionary in the form of:
            {
                "ratings"{
                    "Quality of Course": float,
                    "Quality of Laboratories": float,
                    "Quality of Lectures": float,
                    "Quality of Precepts": float,
                    "Quality of Written Assignments": float,
                    "Recommend to Other Students": float, 
                    # note that some of these entries might not exist, for example, the ratings for EAS classes would not have the Quality of Lab entry because they don't have labs
                },
                "instructors": str list of instructor names,
                "comments": str list of comments,
            }
    """

    def get_evals(self, dept, course_id, term):
        url = self.BASE_URL.format(dept, course_id, term)
        output = {}

        response = self.session.get(url)
        if response.status_code != 200:
            raise AssertionError(
                f"Expected status code 200 in response, got {response.status_code}"
            )

        soup = BeautifulSoup(response.text, "html.parser")

        # check if course does not have evals yet
        no_results = soup.find_all("div", {"class": "no-results"})
        if len(no_results) > 0:
            raise ValueError(f"No evaluations yet for course {course_id} in any term.")

        # check that evaluations page returned is for the correct term
        if not self._is_correct_term(response.url, term):
            raise ValueError(
                f"No evaluations yet for course {course_id} in term {term}. URL was redirected to evaluations page for a different term."
            )

        if not "Office of the Registrar" in soup.header.text.strip():
            raise AssertionError(
                f'Expected "Office of the Registrar" in the response header. Check the response to see if the evaluation page was retrieved correctly. Header found: {soup.header.text.strip()}'
            )

        course = soup.find_all("div", {"class": "course"})
        if len(course) != 1:
            raise AssertionError(
                f"Expected to only find one div with classname=course.You should probably check the code and make sure it's up to date."
            )
        course = course[0]

        # get all the ratings
        stats = course.find_all("table")
        if len(stats) != 2:
            raise AssertionError(
                f"Expected to find two tables in course stats, you probably want to check the code and make sure it's up to date."
            )

        quality_names = stats[0].find_all("th")
        qualities = stats[0].find_all("td")
        output["ratings"] = {}
        for q_name, q_rating in zip(quality_names, qualities):
            output["ratings"][q_name.text] = float(q_rating.text)

        # get all the instructors (should have this info already but might be useful)
        instructors = course.find_all("li", {"class": "instructor"})
        output["instructors"] = [i.text.strip() for i in instructors]

        comments_section = soup.find_all("div", {"class": "comments-section"})
        if len(comments_section) != 1:
            raise AssertionError(
                f"Expected to only find one div with classname=comments_section, you probably want to check the code and make sure it's up to date."
            )
        comments_section = comments_section[0]
        comments = comments_section.find_all("div", {"class": "comment"})

        output["comments"] = [c.text.strip() for c in comments]

        return output


if __name__ == "__main__":

    evals = EvalsScraper()

    dept = "COS"
    course_id = "002051"
    term = "1214"

    print(evals.get_evals(dept=dept, course_id=course_id, term=term))
