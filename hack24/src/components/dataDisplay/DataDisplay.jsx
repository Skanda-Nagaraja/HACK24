import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import "./DataDisplay.css"
import Graph from '../graph/Graph';
import TextGPT from '../TextGpt/TextGPT';
const DataDisplay = () => {
  const loco = useLocation()
  const {stocks} = loco.state;
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [rating, setRating] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRating(0) 
        const response = await fetch(`http://localhost:5000/posts/${selectedStock}`);
        console.log('fetched')
        const json = await response.json()  
        console.log('jsonify')
        console.log(json)
        const data = json.rating
        
  
        if (data.error) {
          alert('Error: No data found for this stock');
        } else {
          setRating(data+50);
          console.log(data)
          // console.log(rating);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };
  
    fetchData();
  }, [selectedStock]);


  return (
    <div className="data min-h-full space-y-10 bg-background-color ">
      <div className="flex justify-around pd-10 bg-background-color ">
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
      <Graph className="w-1/2 h-3/4" ticker={selectedStock} />
       {/* //<SentimentGraph selectedStock={selectedStock} /> */}
       <div className="justify-center align-center">{rating===0 ? "Loading rating..." : `${rating}/100 is the rating for this stock`}</div>
     <TextGPT selectedStock={selectedStock} /> 
    </div>
  );
};

export default DataDisplay;
