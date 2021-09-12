from flask import Flask, jsonify, request, render_template
from flask_cors import CORS


app = Flask(__name__)
if __name__ == "__main__":
    app.run(port=5000)

@app.route('/')
def homepage():
    return "<h1>Hello Word!</h1>"

@app.route('/data', methods=["GET","POST"])
def data():

    #incoming data

    print("request:",request)
    if request.method == "POST":
        print("getting post request")

    return 'hi'

    





