import React, { useState } from 'react';
import "./DataDisplay.css"

const MainPage = () => {
  const [selectedStock, setSelectedStock] = useState('T1');
  const stocks = ['T1', 'T2', 'T3', 'T4'];

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
      {/* <Graph selectedStock={selectedStock} /> */}
      {/* //<SentimentGraph selectedStock={selectedStock} />
     //<GPTText selectedStock={selectedStock} /> */}
    </div>
  );
};

export default MainPage;
