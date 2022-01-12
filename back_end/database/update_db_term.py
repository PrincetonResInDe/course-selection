"""
Script to pull latest term from MobileApp and update term data in database.

$ python update_db_term.py
"""

from database import Database
from mobileapp import MobileApp
import logging

logging.basicConfig(format='%(asctime)s - %(levelname)s - %(name)s: %(message)s', datefmt='%m/%d/%Y %H:%M:%S', level=logging.INFO)
logger = logging.getLogger(__name__)

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
        logger.error("unable to update current term data")


if __name__ == "__main__":
    print("Running script to update current term data in DB...")
    add_current_term()
