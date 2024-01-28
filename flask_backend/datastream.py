import pandas as pd
import numpy as np
import yfinance as yf  # Corrected the import statement
import streamlit as st
import plotly.express as px

# Sidebar inputs
ticker = st.sidebar.text_input("Ticker")
start_date = st.sidebar.date_input("Start Date")
end_date = st.sidebar.date_input('End date')

# Check if the inputs are valid (e.g., ticker is not empty)
if ticker and start_date and end_date:
    # Download data
    data = yf.download(ticker, start=start_date, end=end_date)

    # Check if data is not empty
    if not data.empty:
        # Creating a line plot
        fig = px.line(data, x=data.index, y='Adj Close', title=ticker)

        # Display the plot in the Streamlit app
        st.plotly_chart(fig)
    else:
        st.write("No data available for the given ticker and date range.")
else:
    st.write("Please enter ticker and select start and end dates.")
