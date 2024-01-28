from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_restful import Api, Resource
import yfinance as yf
from datetime import datetime
from openai import OpenAI
import requests
import json
import praw
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax
import pandas as pd

app = Flask(__name__)
CORS(app)
api = Api(app)
client = OpenAI(
    # This is the default and can be omitted
    api_key="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",
)

overview_key = "EDCPLTURPU5IPVT6";


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
        

        
class  RedditPosts(Resource):
    def get(self, ticker):
        try:
            # reddit api auth
            client_id = 'Nrylaz42RfrZ_MyaJFmiUw'
            client_secret = 'kNMnlGPxi1MREbeFkSoX2AxcQuuN7w'
            user_agent = 'python:localhost:8080:v1 (by u/Sanndanu)'
            reddit = praw.Reddit(
                client_id=client_id,
                client_secret=client_secret,
                user_agent=user_agent,
            )

            #subreddit and filters
            subreddit_name = 'wallstreetbets'
            keyword = ticker
            #use aapl, TSLA, AMZN maybe, def BA, NVDA bad
            #use AMD, BA, TSLA, AMC

            subreddit = reddit.subreddit(subreddit_name)
            posts = subreddit.search(keyword, sort='new', time_filter='month', limit=20)

            #load model
            roberta = "cardiffnlp/twitter-roberta-base-sentiment"
            model = AutoModelForSequenceClassification.from_pretrained(roberta)
            tokenizer = AutoTokenizer.from_pretrained(roberta)
            labels = ['Negative', 'Neutral', 'Positive']

            all_probabilities = []

            #parse posts
            for post in posts:

                #title text
                title = post.title
                title_words = []
                for word in title.split(' '):
                    if (word.startswith('@') or word.startswith('https:')) and len(word) > 1:
                        title_words.append('@user')
                    else:
                        title_words.append(word)
                processed_title = " ".join(title_words)

                #post body text
                body = post.selftext
                body_words = []
                for word in body.split(' '):
                    if (word.startswith('@') or word.startswith('https:')) and len(word) > 1:
                        body_words.append('@user')
                    else:
                        body_words.append(word)
                processed_body = " ".join(body_words)

                #comments
                comments_words = []
                for comment in post.comments:
                    # clean comments for potential @s
                    if not isinstance(comment, praw.models.MoreComments):
                        for word in comment.body.split(' '): 
                            if (word.startswith('@') or word.startswith('https:')) and len(word) > 1:
                                comments_words.append('@user')
                            else:
                                comments_words.append(word)
                processed_comments = " ".join(comments_words)

                #combine post title body and comment bodies
                processed_text = f"{processed_title} {processed_body} {processed_comments}"

                for sentence in processed_text.split('.'):
                    if keyword in sentence and len(sentence) < 514:
                        #analyse sentiment
                        

                        encoded = tokenizer(sentence, return_tensors='pt')
                        output = model(encoded['input_ids'], encoded['attention_mask'])
                        #output = model(**encoded)

                        scores = output[0][0].detach().numpy()
                        probabilities = softmax(scores)

                        all_probabilities.append({labels[0] : probabilities[0], labels[1] : probabilities[1], labels[2] : probabilities[2]})

                
            #adding dictionaries to panda dataframe
            df = pd.DataFrame(all_probabilities)
            average_values = df.mean()
            max_frequency_list = []

            # Iterate through rows
            for index, row in df.iterrows():
                # Find the column with the maximum value
                max_column = row.idxmax()

                # Append the max_column to the list
                max_frequency_list.append(max_column)

            # Count the occurrences of each column in the list
            column_counts = pd.Series(max_frequency_list).value_counts()

            # Display the frequency counts
            #print(column_counts)
            rating =  column_counts.get('Positive')*1 + column_counts.get('Negative')*-1
            #print(rating, " is the rating") 
            return jsonify({'rating': int(rating)})
        

        except Exception as e:
            return jsonify({'error': str(e)})
    
                # print(neg, neut, pos)
            #print(average_values)    
                # Return results as JSON
        
api.add_resource(RedditPosts, '/posts/<string:ticker>')


api.add_resource(GraphAPI, '/graph/<string:ticker>/<string:start_date>/<string:end_date>')
# api.add_resource(TextGPT, '/chat')

if __name__ == '__main__':
    app.run(debug=True)
