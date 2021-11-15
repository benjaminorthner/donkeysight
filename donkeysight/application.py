from flask import Flask, render_template

# inits flask app
app = Flask(__name__)

# sets default route to "index.html"
@app.route("/")
def index():
    return render_template("index.html")