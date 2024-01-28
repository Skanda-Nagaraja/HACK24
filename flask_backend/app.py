from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
import yfinance as yf

app = Flask(__name__)
CORS(app)
api = Api(app)

class GraphAPI(Resource):
    def get(self, ticker, start_date, end_date):
        try:
            data = yf.download(ticker, start=start_date, end=end_date)
             # Reset the index to turn the date index into a regular column
            data_reset = data.reset_index()

            # Select only the 'Date' and 'Adj Close' columns
            filtered_data = data_reset[['Date', 'Adj Close']]

            # Convert the filtered DataFrame to JSON
            json_data = filtered_data.to_json(orient="split")

            return jsonify(json_data)
        except Exception as e:
            return jsonify({"error": str(e)})

# Set up the route
api.add_resource(GraphAPI, '/graph/<string:ticker>/<string:start_date>/<string:end_date>')

if __name__ == '__main__':
    app.run(debug=True)
