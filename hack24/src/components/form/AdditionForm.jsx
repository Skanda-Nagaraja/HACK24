import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './additionForm.css'
const AdditionForm = () => {
  const [tickers, setTickers] = useState(['']); // Array to store ticker symbols

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, such as sending the tickers to an API or another component
    localStorage.setItem('tickers', JSON.stringify(tickers));
    console.log(tickers);
  };

  const handleAddSymbol = () => {
    console.log("TICKERS.LENGTH IS ", tickers.length);
    if (tickers.length < 4) {
      setTickers([...tickers, '']); // Add a new empty ticker symbol to the array
    }
    if(tickers.length>=3){
        var addButton = document.getElementById("additionButton")
        addButton.style.display="none"
    }
  };

  const handleTickerChange = (index, value) => {
    const newTickers = [...tickers];
    newTickers[index] = value;
    setTickers(newTickers);
  };

  return (
    
    <div className="fullAdditionPage font-bebas font-semibold font-xl">
      <h1 className="text-4xl font-neuton bg-slate-400 mb-20">Stock Vibes</h1>
      {/* <h2 className="bg-slate-400 mb-20">Add Your Stock Tickers!</h2> */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {tickers.map((ticker, index) => (
          <div key={index} className="flex items-center justify-center">
            <input
              type="text"
              value={ticker.toUpperCase()} // Converts input to uppercase
              onChange={(e) => handleTickerChange(index, e.target.value)}
              placeholder="Enter Ticker Symbol"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            {(index === tickers.length - 1 && tickers.length<=3) && ( // Display the "+" button only for the last input field
              <button id="additionButton"
                type="button"
                onClick={handleAddSymbol}
                className="ml-2 bg-slate-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                +
              </button>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="rounded-full bg-[#363537] hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
        >
          <Link to="/dataDisplay" state={{stocks:tickers}}>Submit</Link>
        </button>
      </form>
    </div>
  );
};

export default AdditionForm;
