// MainPage.jsx
import React, { useState } from 'react';
import Graph from './Graph';
import SentimentGraph from './SentimentGraph';
import GPTText from './GPTText';
//import AdditionForm from './components/form/AdditionForm';

const MainPage = () => {
  const [selectedStock, setSelectedStock] = useState('T1');
  const stocks = ['T1', 'T2', 'T3', 'T4']; // This could be dynamic based on your application

  // Here you would have the logic to fetch the data for the selected stock
  // For example, fetchStockData(selectedStock) function that updates the state with the fetched data

  return (
    <div>
      <div className="flex justify-around p-4 bg-gray-200">
        {stocks.map((stock) => (
          <button
            key={stock}
            onClick={() => setSelectedStock(stock)}
            className={`p-2 ${selectedStock === stock ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
          >
            {stock}
          </button>
        ))}
      </div>
      <Graph selectedStock={selectedStock} />
      <SentimentGraph selectedStock={selectedStock} />
      <GPTText selectedStock={selectedStock} />
    </div>
  );
};

export default MainPage;
