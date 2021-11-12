import requests
import browser_cookie3

if __name__ == "__main__":
    url_template = "https://registrarapps.princeton.edu/course-evaluation?ssub={}&courseinfo={}&terminfo={}"
    # need to get: DEPT, COURSE CODE, TERM CODE
    url.format("COS", "002051", "1214")
    url = "https://registrarapps.princeton.edu/course-evaluation?ssub=COS&courseinfo=002051&terminfo=1214"
    user_agent = "Mozilla/5.0 (X11; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0"
    headers = {"user-agent": user_agent}
    cookies = browser_cookie3.load("princeton.edu")

    session = requests.Session()
    session.cookies.update(cookies)
    session.headers.update(headers)

    response = session.get(url)

    import pdb; pdb.set_trace()
