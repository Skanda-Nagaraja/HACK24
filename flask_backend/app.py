# app.py in your Flask application

from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    # Logic to fetch and analyze tweets
    return render_template('index.html', data=sentiment_data)

if __name__ == '__main__':
    app.run(debug=True)