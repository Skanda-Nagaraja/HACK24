# HACK24

# Inspiration
With the accelerating development of new machine learning models, we thought it would be interesting to harness the power of modern natural language processing in order to retrieve the sentiment of several users from large social networking sites on stocks and other financial products. Since the influence of these sites has already been demonstrated in 2021 with the sudden rise of GameStop stock due to a sub-Reddit, we thought it would be a good idea to use modern tools to tap into these sites.

# What it does
The site allows the user to input multiple stock tickers of their choice. It then runs a query to Reddit, a network of online communities, and parses through posts for relevant content. This content is then ran through a sentiment analysis model, leaving us with data we used to generate a rating for each stock. An appealing graph of the stock's previous closing prices along with a company description is also provided.

# How we built it
The intuitive frontend portion of this application was built with React, combined with Tailwind.Css for a robust styling approach. In terms of the backend, we built it primarily using Flask REST endpoints to handle the routing for the external API calls: Yahoo Finance for the graphs, and Alpha Vantage for company background. The scraper and NLP portion of the application was built mainly using python, with the use of the PRAW library to scrape for relevant Reddit posts and the roBERT-a base model fine tuned for sentiment analysis.

