import requests
import browser_cookie3
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

load_dotenv()

BASE_URL = "https://registrarapps.princeton.edu/course-evaluation?ssub={}&courseinfo={}&terminfo={}"
USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0"


def scrape_eval(session, dept, course_code, term_code):
    """
        Scrapes the evaluation for a specific course.
        Input:
            session: the request session with the proper headers and cookies set up 
            dept: the department code
            course_code: the course code
            term_code: the term code
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
    url = BASE_URL.format(dept, course_code, term_code)
    output = {}

    response = session.get(url)
    if response.status_code != 200:
        raise AssertionError(f"Expected status code 200 in response, got {response.status_code}")

    soup = BeautifulSoup(response.text, 'html.parser')

    if not "Office of the Registrar" in soup.header.text.strip():
        raise AssertionError(f"Expected \"Office of the Registrar\" in the response header. Check the response to see if the evaluation page was retrieved correctly. Header found: {soup.header.text.strip()}")

    course = soup.find_all("div", {"class": "course"})
    if len(course) != 1:
        raise AssertionError(f"Expected to only find one div with classname=course, you probably want to check the code and make sure it's up to date.")
    course = course[0]

    # get all the ratings
    stats = course.find_all("table")
    if len(stats) != 2:
        raise AssertionError(f"Expected to find two tables in course stats, you probably want to check the code and make sure it's up to date.")
    
    quality_names = stats[0].find_all("th")
    qualities = stats[0].find_all("td")
    output["ratings"] = {}
    for q_name, q_rating in zip(quality_names, qualities):
        output["ratings"][q_name.text] = float(q_rating.text)

    # get all the instructors (should have this info already but might be useful)
    instructors = course.find_all("li", {"class": "instructor"})
    output["instructors"] = [i.text.strip() for i in instructors]
    if len(output["instructors"]) == 0:
        raise AssertionError(f"Expected to find more than one instructors for the course, but found none.")

    comments_section = soup.find_all("div", {"class": "comments-section"})
    if len(comments_section) != 1:
        raise AssertionError(f"Expected to only find one div with classname=comments_section, you probably want to check the code and make sure it's up to date.")
    comments_section = comments_section[0]
    comments = comments_section.find_all("div", {"class": "comment"})

    output["comments"] = [c.text.strip() for c in comments]

    return output

if __name__ == "__main__":
    # need to get: DEPT, COURSE CODE, TERM CODE
    url = "https://registrarapps.princeton.edu/course-evaluation?ssub=COS&courseinfo=002051&terminfo=1214"
    headers = {"user-agent": USER_AGENT}

    # Set up the cookies for getting past CAS
    cj = browser_cookie3.load()
    cookies = requests.utils.dict_from_cookiejar(cj)
    if "PHPSESSID" in cookies:
        cookies = {"PHPSESSID": cookies["PHPSESSID"]}
    else:
        cookies = {"PHPSESSID": os.getenv("PHPSESSID")}
    
    session = requests.Session()
    session.cookies.update(cookies)
    session.headers.update(headers)

    dept = "COS"
    course_code="002051"
    term_code="1214"

    scrape_eval(session=session, dept=dept, course_code=course_code, term_code=term_code)

