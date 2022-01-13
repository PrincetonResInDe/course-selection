"""
Script to pull latest course data from MobileApp and Registrar's API and update course data in database.

To update courses for current term:
$ python update_db_courses.py

To update courses for all terms:
$ python update_db_courses.py --all
"""

from database_utils import DatabaseUtils
from multiprocessing import Pool
from mobileapp import MobileApp
import os
from update_db_helpers import update_courses_for_one_term
import argparse
import logging

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s: %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

# update course info in db for current term
def update_courses_for_current_term() -> None:
    try:
        curr_term = MobileApp().get_current_term_code()
        update_courses_for_one_term(curr_term)
    except:
        logger.error("failed to update courses for current term")


# update course info in db for all terms
# DO NOT RUN: CURRENTLY CRASHES MID-WAY DUE TO MOBILEAPP TIMEOUT ERROR
# TO-DO: work witb OIT about timeout issue
def update_courses_for_all_terms() -> None:
    try:
        db = DatabaseUtils()
        terms = db.get_all_terms()

        # use multiprocessing to update terms in parallel
        with Pool(os.cpu_count()) as pool:
            pool.map(update_courses_for_one_term, terms)
    except:
        logger.error("failed to add courses for all terms")


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--all", help="update courses in DB for all terms", action="store_true"
    )

    args = parser.parse_args()
    if args.all:
        print("Running script to update courses in DB for all terms...")
        update_courses_for_all_terms()
    else:
        print("Running script to update courses in DB for current term...")
        update_courses_for_current_term()
