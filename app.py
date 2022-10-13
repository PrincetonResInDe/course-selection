from dotenv import load_dotenv
from flask import (
    Flask,
    jsonify,
    redirect,
    request,
    session,
    url_for,
    send_from_directory,
)
import os
from flask_cors import CORS
from database_api import DatabaseAPI
import logging
from search import do_search

load_dotenv()

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s -   %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder="front_end/build", static_url_path="/")
app.secret_key = os.getenv("SECRET_KEY")
app.config["JSON_SORT_KEYS"] = False

CORS(app)  # not sure how important this line is right now

db = DatabaseAPI()


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/about")
def about():
    return app.send_static_file("index.html")


@app.route("/calendar")
def calendar():
    return app.send_static_file("index.html")


@app.route("/path")
def path():
    return app.send_static_file("index.html")


# ------------- API ROUTES ------------- #
"""
    When writing the API endpoints, refer to the test-database
    endpoint below as an example.
"""


@app.route("/api/test-database", methods=["GET"])
def test_database():
    logger.info("Reached /api/test-database")
    return jsonify(db.get_all_test())


@app.route("/search", methods=["GET"])
def search():
    args = request.args
    query = args.get("query", "")
    semester = args.get("semester", "")
    special = args.get("special", "")

    # Assume multiple values are passed in as comma-separated values
    dists = args.get("dists", None)
    grading = args.get("grading", None)
    levels = args.get("levels", None)
    depts = args.get("depts", None)

    query_dict = {
        "string": query,
        "semester": semester,
        "filters": {
            "special": special,
            "dists": dists.split(",") if dists else [],
            "grading": grading.split(",") if grading else [],
            "levels": levels.split(",") if levels else [],
            "depts": depts.split(",") if depts else []
        }
    }

    # See database_api.py for structure of input query
    res = do_search(query_dict)
    return jsonify(res)


@app.route("/api/get-course-info", methods=["GET"])
def course_info():
    logger.info("Reached /api/course-info")
    args = request.args
    course_id = args.get("course_id", "")
    semester = args.get("semester", "")
    res = db.get_course_info(course_id, semester)
    return jsonify(res)
