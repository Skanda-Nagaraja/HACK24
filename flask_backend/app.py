from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_restful import Api, Resource
import yfinance as yf
from datetime import datetime
from openai import OpenAI
import requests
import json

app = Flask(__name__)
CORS(app)
api = Api(app)
client = OpenAI(
    # This is the default and can be omitted
    api_key="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",
)

overview_key = "67U1OY2IB6BM34F3";


@app.route('/company_description', methods=['GET'])
def company_description():
    ticker = request.args.get('ticker', default='', type=str)
    if not ticker:
        return jsonify({"error": "Ticker symbol is required"}), 400

    response = requests.get(
        "https://www.alphavantage.co/query",
        params={
            "function": "OVERVIEW",
            "symbol": ticker,
            "apikey": overview_key
        }
    )

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

    data = response.json()
    description = data.get("Description", "No description found.")
    return jsonify({"description": description})


class GraphAPI(Resource):
    def get(self, ticker, start_date, end_date):
        try:
            data = yf.download(ticker, start=start_date, end=end_date)
            data_reset = data.reset_index()

            # Convert 'Date' to timestamp and 'Adj Close' to list
            dates = data_reset['Date'].apply(lambda x: int(x.timestamp() * 1000)).tolist()
            prices = data_reset['Adj Close'].tolist()

            paired_data = list(zip(dates, prices))
            return jsonify(paired_data)
        except Exception as e:
            return jsonify({"error": str(e)})
        

        




api.add_resource(GraphAPI, '/graph/<string:ticker>/<string:start_date>/<string:end_date>')
# api.add_resource(TextGPT, '/chat')

if __name__ == '__main__':
    app.run(debug=True)
