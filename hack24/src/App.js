import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import AdditionForm from './components/form/additionForm';
import DataDisplay from './components/dataDisplay/DataDisplay';
function App() {
  return (
    <div class="App">
      <BrowserRouter>
      <div class="titleDiv"></div>
        <div className="pages">
          <Routes>
            <Route path='/' element={<AdditionForm />}/>
            <Route path='/dataDisplay' element={<DataDisplay/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    
   
  );
}

export default App;
