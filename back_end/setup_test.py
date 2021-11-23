from pymongo import MongoClient
from pprint import pprint
import certifi
from dotenv import load_dotenv
import os

# loads in the .env file (The access string), loaded into an environmental variable. Safer for access
load_dotenv()


def insertSampleCourse(c_client, c_db):
    # Drops the old collection
    c_db = c_db.course.drop()

    # Creates the collection course
    course_collection = db.course

    found = set()
    print("db course collection should be empty")
    # .find() queries within a collection (select * SQL)
    element = course_collection.find_one({"Name": "Computer Science: An Interdisciplinary Approach"})
    if (element != None):
        found.add(element)
    assert found == set()

    courseData = {"Name": "Computer Science: An Interdisciplinary Approach", "Course Codes": ["COS126", "EGR126"],
                   "Distribution Area": ["QCR"], "Instructor": ["Adam Finkelstein", "Ruth Fong", "Alan Kaplan"],
                   "Grading": ["45% Other exam", "40% Programming assignments", "10% Design project",
                               "5% Other (see instructor)"],
                   "Prerequisites": "No prior programming experience is required.", "Other information":
                   "Precepts P10-P14 are extended-time precepts for students who prefer more time to ask questions and work through exercises with their preceptor and classmates. Students who aren't sure whether extended-time precepts are right for them should consider registering for a MW 11am or 1:30pm precept -- these time slots offer both regular and extended-time options (P01,P10; P03, P11) with flexibility to switch between the two in the first few weeks.",
                   "Readings": "Computer Science: An Interdisciplinary Approach", "Comments": ["Great class"]}
    print("Inserting COS 126 data")
    course_collection.insert_one(courseData)
    print("COS 126 data inserted")

    # Ensuring the course is in database
    print("Current data in db people")
    for course in course_collection.find():
        print(course)



if __name__ == "__main__":
    client = MongoClient(os.getenv("MONGO"), tlsCAFile=certifi.where())
    db = client.admin

    serverStatusResult = db.command("serverStatus")
    pprint(serverStatusResult)

    # when I want to make a new database. This is the Mongo equivalent of a table. (Page)
    db = client.test
    # .drop deletes old collections
    db.people.drop()
    found = set()

    print("db people collection should be empty")
    # .find() queries within a collection (select * SQL)
    for x in db.people.find():
        print(x)
        found.add(x)
    assert found == set()

    data = [{"name": "howard", "year": 2023}, {"name": "joanna", "year": 2022}, {"name": "begum", "year": 2022}, {"name": "theo", "year": 2021}]
    print("inserting data....")
    db.people.insert_many(data)

    found = set()
    print("current data in db people")
    for x in db.people.find():
        print(x)
        found.add(x["name"])
    assert found == set([i["name"] for i in data])

    print("query for 2022")
    query = {"year": 2022}
    found = set()
    for x in db.people.find(query):
        print(x)
        found.add(x["name"])
    assert found == set([i["name"] for i in data if i["year"] == 2022])

    insertSampleCourse(client, db)

