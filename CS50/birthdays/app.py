import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///birthdays.db")

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # TODO: Add the user's entry into the database

        missing_data = ""

        # Request data from database
        name = request.form.get("name")
        month = request.form.get("month")
        day = request.form.get("day")

        # Check if the data is fully ok, else save missing value in variable
        if not name:
            missing_data = "Please provide name value!"
        elif not month:
            missing_data = "Please provide month value!"
        elif not day:
            missing_data = "Please provide day value!"
        # If everything ok, execute SQL query and insert values in db
        else:
            db.execute(
                "INSERT INTO birthdays (name, month, day) VALUES(?, ?, ?)",
                name,
                month,
                day,
            )
        # If not ok, fetch all data anyway
        birthdays = db.execute("SELECT * FROM birthdays")
        # Render that data to index.html and tell user that there are missing values, son nothing inserted
        return render_template("index.html", missing_data=missing_data, birthdays=birthdays)

        # TODO: Display the entries in the database on index.html
    # If request method is GET
    else:
        # Select everything in db
        birthdays = db.execute("SELECT * FROM birthdays")
        # Render it to index.html
        return render_template("index.html", birthdays=birthdays)


