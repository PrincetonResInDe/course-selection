from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, request, session, url_for, send_from_directory
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__, static_folder="front_end/build", static_url_path="/")
app.secret_key = os.getenv("SECRET_KEY")
app.config["JSON_SORT_KEYS"] = False

CORS(app) # not sure how important this line is right now

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/about")
def about():
    return app.send_static_file("index.html")

@app.route("/calendar")
def calendar():
    return app.send_static_file("index.html")

@app.route("/path")
def path():
    return app.send_static_file("index.html")
