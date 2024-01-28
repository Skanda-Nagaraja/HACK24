
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useState, useEffect } from 'react';

import './App.css';
import AdditionForm from './components/form/AdditionForm';
import DataDisplay from './components/dataDisplay/DataDisplay';
import TextGPT from './components/TextGpt/TextGPT';
function App() {
  // Declare state at the top of the function
  const [data, setData] = useState([{}]);


  return (

    <div className="App font-bebas bg-background-color min-h-screen">
      <BrowserRouter >
        <div className="pages">
          <Routes>
            <Route path='/' element={<AdditionForm />}/>
            <Route path='/dataDisplay' element={<DataDisplay/>}/>
            <Route path='/textGPT' element={<TextGPT/>}/>
          </Routes>
          {console.log(data)}
        </div>
      </BrowserRouter>

    </div>
    
   
  );
}

export default App;