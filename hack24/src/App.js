import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Declare state at the top of the function
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {console.log(data)}
    </div>
  );
}

export default App;