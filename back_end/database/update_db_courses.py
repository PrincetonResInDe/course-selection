from database_utils import DatabaseUtils
from multiprocessing import Pool
from mobileapp import MobileApp
import os
from update_db_helpers import update_courses_for_one_term
import argparse
import logging
from typing import List

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s: %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

"""
    This script pulls latest course data from MobileApp and Registrar's API and updates course data in database.

    To update courses for current term:
    $ python update_db_courses.py --curr

    To update courses for specified term(s):
    $ python update_db_courses.py <term_code_1> <term_code_2> ...

    To update courses for all terms:
    $ python update_db_courses.py
"""

# Update course information in db for current term
def update_courses_for_current_term() -> None:
    try:
        curr_term = MobileApp().get_current_term_code()
        update_courses_for_one_term(term=curr_term, batch=True)
    except Exception as e:
        logger.error(f"failed to update courses for current term with error {e}")


# Update course information in db for specified terms
# terms: list of term codes or None
def update_courses_for_terms(terms: List[str] = None) -> None:
    try:
        db = DatabaseUtils()
        if terms is None:
            terms = db.get_all_terms()

        # use multiprocessing to update terms in parallel
        with Pool(os.cpu_count()) as pool:
            pool.map(update_courses_for_one_term, terms)
    except Exception as e:
        logger.error(f"failed to update courses for all terms with error {e}")


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--terms", nargs="*", help="update courses for specified terms")
    group.add_argument(
        "--curr", help="update courses for current term", action="store_true"
    )

    args = parser.parse_args()

    if args.terms is None and args.curr is False:
        # DO NOT RUN: CURRENTLY CRASHES MID-WAY DUE TO MOBILEAPP TIMEOUT ERROR
        # TO-DO: work witb OIT about timeout issue
        print("Running script to update courses in DB for all terms...")
        update_courses_for_terms()
    elif args.curr:
        print("Running script to update courses in DB for current term...")
        update_courses_for_current_term()
    else:
        print("Running script to update courses in DB for specified terms...")
        update_courses_for_terms(terms=args.terms)
