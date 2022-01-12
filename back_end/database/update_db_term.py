"""
Script to pull latest term from MobileApp and update term data in database.

$ python update_db_term.py
"""

from database import Database
from mobileapp import MobileApp
from sys import stderr

# add current term data to semesters collection (ignores if already exists)
def add_current_term() -> None:
    db = Database()
    try:
        data = MobileApp().get_current_term_data()
        new_data = {
            "code": data["code"],
            "name": data["cal_name"],
            "start_date": data["start_date"],
            "end_date": data["end_date"],
        }
        db.add_current_term(new_data)
    except:
        print("unable to update current term data", file=stderr)


if __name__ == "__main__":
    print("Running script to update current term data in DB...")
    add_current_term()
