from evaluations import EvalsScraper
from mobileapp import MobileApp
from database_utils import DatabaseUtils
from evaluations import EvalsScraper
from multiprocessing import Pool
import os
import logging
import argparse
from typing import List

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s: %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

"""
    This script scrapes course evaluations and update evals stored in the database.

    INSTRUCTIONS: Before running the evals update script, 
    make sure you are logged into CAS on one of the browsers supported by browser_cookie3
    (https://github.com/borisbabic/browser_cookie3). Or, you can 
    manually add a valid "PHPSESSID" token in your .env file.

    To update courses for specified term(s):
    $ python update_db_evals.py <term_code_1> <term_code_2> ...

    To update courses for all terms:
    $ python update_db_evals.py
"""

# Update evaluations data in db for one term
# term = term code
def update_evals_for_one_term(term: str) -> None:
    db = DatabaseUtils()
    evals = EvalsScraper()

    # check term code is valid
    if not db.is_valid_term_code(code=term):
        logger.error(f"invalid term code {term} provided")
        return

    # get course data from mobileapp api
    try:
        logger.info(f"getting course data for term {term} from mobileapp")
        all_courses = MobileApp().get_all_courses(term)
    except Exception as e:
        logger.error(
            f"unable to get course data for term {term} from mobileapp with error {e}"
        )
        return

    logger.info(f"started updating evals data for term {term}")

    for subject in all_courses:
        dept = subject["code"]
        logger.info(f"processing courses for {dept}")
        for mapp_course in subject["courses"]:
            course_id = mapp_course["course_id"]
            guid = mapp_course["guid"]

            logger.info(f"scraping evals data for course {guid}")
            try:
                try:
                    # run scraper for this course
                    evals_dict = evals.get_evals(dept, course_id, term)
                except ValueError:
                    logger.info(f"no evals for course {guid}")
                except AssertionError:
                    logger.error(
                        f"failed to get evals for course {guid}, likely need to update evals scraper code"
                    )

                data = {
                    "guid": guid,
                    "term": term,
                    "course_id": course_id,
                    "ratings": evals_dict["ratings"],
                    "comments": evals_dict["comments"],
                }
                # update evals for this course
                db.update_evals_data(guid, data)
            except Exception as e:
                logger.error(f"failed to update evals for course {guid} with error {e}")


# Update evaluations data in db for specified terms
# terms = list of term codes or None
def update_evals_for_terms(terms: List[str] = None):
    try:
        db = DatabaseUtils()
        if terms is None:
            terms = db.get_all_terms()

        # use multiprocessing to update terms in parallel
        with Pool(os.cpu_count()) as pool:
            pool.map(update_evals_for_one_term, terms)
    except Exception as e:
        logger.error(f"failed to update evals for all terms with error {e}")


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("--terms", nargs="*", help="update evals for specified terms")

    args = parser.parse_args()

    if args.terms is None:
        # DO NOT RUN: CURRENTLY CRASHES MID-WAY DUE TO MOBILEAPP TIMEOUT ERROR
        # TO-DO: work witb OIT about timeout issue
        print("Running script to update evals in DB for all terms...")
    else:
        print("Running script to update evals in DB for specified terms...")
    update_evals_for_terms(terms=args.terms)
