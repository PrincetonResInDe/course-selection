"""
Script to pull latest term from MobileApp and update term data in database.

$ python update_db_term.py
"""

from database_utils import DatabaseUtils
from mobileapp import MobileApp
import logging

logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s: %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)


# Add/update current term data in db
def update_current_term() -> None:
    try:
        db = DatabaseUtils()
        data = MobileApp().get_current_term_data()
        new_data = {
            "code": data["code"],
            "name": data["cal_name"],
            "start_date": data["start_date"],
            "end_date": data["end_date"],
        }
        db.update_current_term(new_data)
    except Exception as e:
        logger.error(f"unable to update current term data with error {e}")


if __name__ == "__main__":
    print("Running script to update current term data in DB...")
    update_current_term()
