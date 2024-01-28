
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useState, useEffect } from 'react';

import './App.css';
import AdditionForm from './components/form/AdditionForm';
import DataDisplay from './components/dataDisplay/DataDisplay';
function App() {
  // Declare state at the top of the function
  const [data, setData] = useState([{}]);

  return (

    <div class="App">
      <BrowserRouter>
      <div class="titleDiv"></div>
        <div className="pages">
          <Routes>
            <Route path='/' element={<AdditionForm />}/>
            <Route path='/dataDisplay' element={<DataDisplay/>}/>
          </Routes>
          {console.log(data)}
        </div>
      </BrowserRouter>

    </div>
    
   
  );
}

export default App;