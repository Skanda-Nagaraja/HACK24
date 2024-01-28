import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import "./DataDisplay.css"
import Graph from '../graph/Graph';
const MainPage = () => {
  const loco = useLocation()
  const {stocks} = loco.state;
  const [selectedStock, setSelectedStock] = useState('');
  // const [stocks, setStocks] = useState([]);
  // useEffect(() => {
  // //   // Retrieve the tickers from local storage
  // //   // const savedTickers = localStorage.getItem('tickers');
  // //   console.log(stocks)
  // //   const savedTickers = stocks;

  // // }, []);


  return (
    <div>
      <div className="flex justify-around pd-10 bg-slate-400">
        {stocks.map((stock) => (
          <button
            key={stock}
            onClick={() => setSelectedStock(stock)}
            className={`px-4 py-2 text-lg rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 
                        ${selectedStock === stock ? 'shadow-lg' : 'shadow-sm'} 
                        hover:border-b-4 hover:border-gray-400`}
            style={{
                backgroundColor: selectedStock === stock ? '#F4FAFF' : '',
                borderBottomColor: selectedStock === stock ? 'green' : 'transparent', // This will apply a green underline
                borderBottomWidth: selectedStock === stock ? '4px' : '0px',
                borderBottomStyle: 'solid' // This ensures the underline is solid
            }}
          >
            {stock}
          </button>
        ))}
      </div>
      <Graph ticker={selectedStock} />
      {/* //<SentimentGraph selectedStock={selectedStock} />
     //<GPTText selectedStock={selectedStock} /> */}
    </div>
  );
};

export default DataDisplay;
