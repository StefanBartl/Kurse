import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show profile of stocks"""

    # Fetch all user's stocks and cash total
    stocks = db.execute("SELECT * FROM profile WHERE userid = :id", id=session["user_id"])
    cash = db.execute("SELECT cash FROM users WHERE id = :id", id=session["user_id"])

    # Calculate cash
    cash = cash[0]['cash']

    # To calculate total amount of all assets, initialize variable with cash
    assets_total = cash

    # Add name, price & total to stocks
    for stock in stocks:
        look = lookup(stock['symbol'])
        stock['name'] = look['name']
        stock['price'] = look['price']
        stock['total'] = stock['price'] * stock['shares']

        # Increment assets_total
        assets_total += stock['total']

        # Convert to usd format
        stock['price'] = usd(stock['price'])
        stock['total'] = usd(stock['total'])

    return render_template("index.html", rows=stocks, cash=usd(cash), sum=usd(assets_total))


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""

    # -> buy.html
    if request.method == "GET":
        return render_template("buy.html")

    else:
        # Get data
        symbol = request.form.get("symbol")
        quote = lookup(symbol)
        shares = request.form.get("shares")

        # Check for invalid symbol
        if quote == None:
            return apology("Invalid stock symbol.", 400)

        # Check if shares are set
        if not shares:
            return apology("Enter number of shares.", 400)

        # Check if shares are numeric
        if shares.isnumeric() == False:
            return apology("Only numeric characters are allowed.", 400)

        # Check if shares are positiv
        if int(shares) < 1:
            return apology("Enter positive number of shares.", 400)

        # Convert shares to int
        shares = int(shares)

        # Convert data
        symbol = symbol.upper()
        price = quote['price'] * shares

        # Check if buying is possible
        cash = db.execute("SELECT cash FROM users WHERE id = :id", id=session["user_id"])
        cash = cash[0]['cash']
        if cash - price < 0:
            return apology("Not enough cash.", 400)

        # Update cash
        new_cash = cash - price
        db.execute("UPDATE users SET cash = :new_cash WHERE id = :id",
                   new_cash=new_cash, id=session["user_id"])

        # Check if user have stocks from this symbol
        stock = db.execute("SELECT * FROM profile WHERE userid = :id AND symbol = :symbol",

                        id=session["user_id"], symbol=symbol)

        if len(stock) != 1:
            db.execute("INSERT INTO profile (userid, symbol) VALUES (:id, :symbol)",

                       id=session["user_id"], symbol=symbol)

        # Get owned number of shares, check if there are some owned
        owned_shares = db.execute("SELECT shares FROM profile WHERE userid = :id AND symbol = :symbol",
                              id=session["user_id"], symbol=symbol)
        owned_shares = owned_shares[0]["shares"]
        if type(owned_shares) != int:
            owned_shares = 0

        # Insert new number of shares in db
        newshares = owned_shares + shares
        db.execute("UPDATE profile SET shares = :newshares WHERE userid = :id AND symbol = :symbol",
                   newshares=newshares, id=session["user_id"], symbol=symbol)

        # Update history
        db.execute("INSERT INTO history (userid, symbol, shares, method, price) VALUES (:userid, :symbol, :shares, 'Buy', :price)",
                   userid=session["user_id"], symbol=symbol, shares=shares, price=quote['price'])

    # -> index.html
    return redirect("/")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""

    # Fetch stock from db
    stock = db.execute("SELECT * FROM history WHERE userid = :userid", userid=session["user_id"])

    # -> history.html with data
    return render_template("history.html", rows=stock)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 400)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 400)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    # GET -> quote.html
    if request.method == "GET":
        return render_template("quote.html")

    else:

        # Lookup symbol
        symbol = lookup(request.form.get("symbol"))

        # Check for invalid symbol
        if symbol == None:
            return apology("Invalid stock symbol.", 400)

        # -> quoting.html and pass the data
        return render_template("quoting.html", symbol=symbol)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget user_id
    session.clear()

    if request.method == "POST":

        # Make sure username was provided
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Make sure password was provided
        if not request.form.get("password"):
            return apology("must provide password", 400)

        # Make sure both passwords are the same
        if request.form.get("password") != request.form.get("confirmation"):
            return apology("passwords do not match", 400)

        # save username and password
        username = request.form.get("username")
        password = request.form.get("password")

        # hash password
        hash = generate_password_hash(password)

        # Check for unique username (if there is a username already, username check has 1 member)
        username_check = db.execute("SELECT * FROM users WHERE username = :username",
                                     username=username)

        if len(username_check) == 1:
            return apology("Username is taken, sorry", 400)

        # Else insert username and hash in db
        db.execute("INSERT INTO users (username, hash) VALUES (:username, :hash)",
                   username=username, hash=hash)

        # -> login.html
        return redirect("/", 200)

    # If user clicked register in Navbar -> register.html
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""

    # GET -> render sell.html
    if request.method == "GET":

        # Get current stocks
        profile = db.execute("SELECT symbol FROM profile WHERE userid = :id",
                             id=session["user_id"])

        # Render sell form with possible stocks
        return render_template("sell.html", portfolio=profile)

    # POST -> user want to sell
    else:
        # Get neccesary data from form
        symbol = request.form.get("symbol")
        quote = lookup(symbol)
        shares_to_sell = int(request.form.get("shares"))
        stocks = db.execute("SELECT * FROM profile WHERE userid = :id AND symbol = :symbol",
                            id=session["user_id"], symbol=symbol)

        # If incorrect shares
        if not shares_to_sell:
            return apology("Incorrrect number of shares to sell", 400)

        # If incorrect smybol
        if len(stocks) != 1:
            return apology("Incorrect stock symbol", 400)

        # Get owned shares
        owned_shares = stocks[0]['shares']

        # Return if user want to sell more shares than owned
        if shares_to_sell > owned_shares:
            return apology("Can't sell more shares than owned.", 400)

        # Calculate total assets
        cash_db = db.execute("SELECT cash FROM users WHERE id = :id", id=session['user_id'])
        cash = cash_db[0]['cash']
        total_assets = int(cash) + (quote['price'] * shares_to_sell)

        # Update assets in DB
        db.execute("UPDATE users SET cash = :cash WHERE id = :id",
                   cash=total_assets, id=session["user_id"])

        # Calculate new stock
        new_stock = owned_shares - shares_to_sell

        # Update profile table with new stock
        if new_stock > 0:
            db.execute("UPDATE profile SET shares = :new_stock WHERE userid = :id AND symbol = :symbol",
                       new_stock=new_stock, id=session["user_id"], symbol=symbol)

        # If no shares, delete stock from db
        else:
            db.execute("DELETE FROM profile WHERE symbol = :symbol AND userid = :id",
                       symbol=symbol, id=session["user_id"])

        # Update history table
        db.execute("INSERT INTO history (userid, symbol, shares, method, price) VALUES (:userid, :symbol, :shares, 'Sell', :price)",
                   userid=session["user_id"], symbol=symbol, shares=new_stock, price=quote['price'])

        # Redirect -> index.html
        return redirect("/")