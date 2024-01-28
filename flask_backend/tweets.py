import praw

# Replace these with your own credentials
client_id = 'Nrylaz42RfrZ_MyaJFmiUw'
client_secret = 'kNMnlGPxi1MREbeFkSoX2AxcQuuN7w'

user_agent = 'python:localhost:8080:v1 (by u/Sanndanu)'

# Create a Reddit instance<platform>:<app ID>:<version string> (by u/<Reddit username>)
reddit = praw.Reddit(
    client_id=client_id,
    client_secret=client_secret,
    user_agent=user_agent,
)

# Example: Print titles of hot posts in a subreddit
subreddit_name = 'wallstreetbets'
subreddit = reddit.subreddit(subreddit_name)

# Define your search query
search_query = 'AAPL'

# Perform the search and print the titles of the matching posts
for submission in subreddit.search(query=search_query, sort='new', time_filter='all'):
    print(submission.title)