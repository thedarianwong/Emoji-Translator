from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def index():
    return open("frontend/index.html").read()


@app.route("/translate")
def translate():
    input_text = request.args.get("input")
    # Replace this with your translation logic
    output_text = "Translated: " + input_text
    return output_text
