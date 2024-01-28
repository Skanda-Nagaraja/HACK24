from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
import yfinance as yf
from datetime import datetime

app = Flask(__name__)
CORS(app)
api = Api(app)

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

if __name__ == '__main__':
    app.run(debug=True)
