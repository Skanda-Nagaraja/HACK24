import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import "./DataDisplay.css"
import Graph from '../graph/Graph';
import TextGPT from '../TextGpt/TextGPT';
const MainPage = () => {
  const loco = useLocation()
  const {stocks} = loco.state;
  const [selectedStock, setSelectedStock] = useState(stocks[0]);

  const [rating, setRating] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/posts/AMD`);
        const data = response.json()
        console.log(data)
  
        if (data.error) {
          alert('Error: No data found for this stock');
        } else {
          setRating(Math.round(data.rating));
          console.log(rating);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };
  
    fetchData();
  }, [selectedStock]);

  return (
    <div className="min-h-full space-y-10">
      <div className="flex justify-around pd-10 bg-slate-400">
        {stocks.map((stock) => (
          <button
            key={stock}
            onClick={() => {setSelectedStock(stock)}}
            className={`px-4 py-2 text-lg rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 
                        ${selectedStock === stock ? 'shadow-lg' : 'shadow-sm'} 
                        hover:border-b-4 hover:border-gray-400`}
            style={{
                backgroundColor: selectedStock === stock ? '#F4FAFF' : '',
                borderBottomColor: selectedStock === stock ? 'green' : 'transparent', // This will apply a green underline
                borderBottomWidth: selectedStock === stock ? '4px' : '0px',
                borderBottomStyle: 'solid', // This ensures the underline is solid,
            }}
          >
            {stock}
          </button>
        ))}
      </div>
      <Graph ticker={selectedStock} />
       {/* //<SentimentGraph selectedStock={selectedStock} /> */}
     <TextGPT selectedStock={"AMD"} /> 
    </div>
  );
};

export default MainPage;
