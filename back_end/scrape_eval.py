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
            All the course evaluations as a dictionary.
    """
    url = BASE_URL.format(dept, course_code, term_code)
    response = session.get(url)

    soup = BeautifulSoup(response.text, "html.parser")


    pass

if __name__ == "__main__":
    # need to get: DEPT, COURSE CODE, TERM CODE
    url = "https://registrarapps.princeton.edu/course-evaluation?ssub=COS&courseinfo=002051&terminfo=1214"
    headers = {"user-agent": USER_AGENT}
    cj = browser_cookie3.load()
    cookies = requests.utils.dict_from_cookiejar(cj)
    import pdb; pdb.set_trace()
    if "PHPSESSID" in cookies:
        cookies = {"PHPSESSID": cookies["PHPSESSID"]}
    else:
        cookies = {"PHPSESSID": os.getenv("PHPSESSID")}
    

    session = requests.Session()
    session.cookies.update(cookies)
    session.headers.update(headers)

    response = session.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    stats = soup.find_all("table", {"class": "sr-only sr-only-focusable"})

    def get_course_evaluation(tag):
        return tag.caption is not None and "Course Evaluation Results" in tag.caption.text
    temp = soup.find_all(get_course_evaluation)
    import pdb; pdb.set_trace()

    print(stats[0])
    quality_names = stats[0].find_all("th")
    qualities = stats[0].find_all("td")
    
    print([q.text for q in quality_names])
    print([q.text for q in qualities])

    output = {}
    output["current_year"] = {}
    for k, v in zip(quality_names, qualities):
        output["current_year"][k.text] = float(v.text)

    # Trying to pull the class comments 
    comments_section = soup.find_all("div", {"class": "comments-section mt-4"})

    print(comments_section)
    print(comments_section[0])

    
    