"""
Script to pull latest course data from MobileApp and Registrar's API and update course data in database.

To update courses for current term:
$ python update_db_courses.py

To update courses for all terms:
$ python update_db_courses.py --all
"""

from database import Database
from sys import stderr, argv
from multiprocessing import Pool
from mobileapp import MobileApp
import os
from update_db_helpers import update_courses_for_one_term

# update course info in db for current term
def update_courses_for_current_term() -> None:
    try:
        curr_term = MobileApp().get_current_term_code()
        update_courses_for_one_term(curr_term)
    except:
        print("failed to update courses for current term", file=stderr)


# update course info in db for all terms
# DO NOT RUN: CURRENTLY CRASHES MID-WAY DUE TO MOBILEAPP TIMEOUT ERROR
# TO-DO: work witb OIT about timeout issue
def update_courses_for_all_terms() -> None:
    try:
        db = Database()
        terms = db.get_all_terms()
        with Pool(os.cpu_count()) as pool:
            pool.map(update_courses_for_one_term, terms)
    except:
        print("failed to add courses for all terms", file=stderr)


if __name__ == "__main__":

    if len(argv) == 1:
        print("Running script to update courses in DB for current term...")
        update_courses_for_current_term()
    elif len(argv) == 2 and str(argv[1]) == "--all":
        # DO NOT RUN: CURRENTLY CRASHES MID-WAY DUE TO MOBILEAPP TIMEOUT ERROR
        print("Running script to update courses in DB for all terms...")
        update_courses_for_all_terms()
    else:
        print(
            'Invalid arguments.\nSpecify no args to update courses for the current term. Add "--all" to update courses for all terms.'
        )
