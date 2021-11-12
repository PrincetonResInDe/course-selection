from pymongo import MongoClient
from pprint import pprint
import certifi
from dotenv import load_dotenv
import os

# loads in the .env file (The access string), loaded into an environmental variable. Safer for access
load_dotenv()

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