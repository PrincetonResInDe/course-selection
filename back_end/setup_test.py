from pymongo import MongoClient
from pprint import pprint
import json
import certifi
from dotenv import load_dotenv
import os

# loads in the .env file (The access string), loaded into an environmental variable. Safer for access
load_dotenv()


def insertSampleCourse(c_client, c_db):
    # Loads in the COS126 JSON file
    with open('COS126.json') as f:
        course_data = json.load(f)

    # Drops the old collection
    c_db = c_db.course.drop()

    # Creates the collection course
    course_collection = db.course

    found = set()
    print("db course collection should be empty")
    # .find() queries within a collection (select * SQL)
    element = course_collection.find_one({"Name": "Computer Science: An Interdisciplinary Approach"})
    if element is not None:
        found.add(element)
    assert found == set()

    print("Inserting COS 126 data")
    course_collection.insert_one(course_data)
    print("COS 126 data inserted")

    # Ensuring the course is in database
    element = course_collection.find_one({"Name": "Computer Science: An Interdisciplinary Approach"})
    assert element is not None

    print("Printing all elements:")
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
