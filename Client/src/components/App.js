import React, { useState } from 'react';

import Search from './Search';
import View from './View';
import Login from './Login';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ViewFlights from './ViewFlights';
import Checkout from './Checkout';
import Checkin from './Checkin';
import BoardingPass from './BoardingPass';
import { useSelector, useDispatch } from "react-redux";


import './CSS/App.css';

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from "react-router-dom";

function App() {
  //const functionName = useSelector(state => state.flightSlice.functionName)

  const getSQL = async(fileN) => {
    try {
      const body = { fileName: fileN}
      const response = await fetch("http://localhost:5000/routes/grabSql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(await response.json())
    } catch (error) {
      console.log(error);     
    }
  }
 

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <div className="app-container">
        <div className='header-dummy'></div>
          <header>
            <Link className='link' to='/'>
              <p className='app-logo'>Cheap<span>Flights</span></p>
            </Link>

            <a style={{ display: "table-cell" }} href="https://github.com/gabrielzurc10/database-proj" target="gitHub">Github</a>

            <button onClick={() => getSQL("query.sql")} className='view-form-h3'>SQL</button>
            <button onClick={() => getSQL("transaction.sql")} className='view-form-h3'>Transactions</button>

          </header>

          <section>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/search-flight/flights' element={<ViewFlights />} />
              <Route path='/search-flight' element={<Search />} />
              <Route path='/view-flight' element={<View />} />
              <Route path ='/checkout' element={<Checkout />} />
              <Route path ='/checkin' element={<Checkin />} />
              <Route path ='/boardingpass' element={<BoardingPass />} />
            </Routes>
          </section>


        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
