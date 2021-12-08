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

import './CSS/App.css';

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [sql, setSql] = useState();
  const [trans, setTrans] = useState();

  const [sqlShow, setSqlShow] = useState(false);
  const [transShow, setTransShow] = useState(false);

  const getSQL = async () => {
    const response = await fetch("http://localhost:5000/get-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    setSql(await response.json());
  }

  const getTrans = async () => {

    const response = await fetch("http://localhost:5000/get-trans", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    setTrans(await response.json());
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

            <a className='view-form-h3' style={{ display: "table-cell" }} href="https://github.com/gabrielzurc10/database-proj" target="gitHub">Github</a>

            <p onClick={() => {
              getSQL();
              setSqlShow(!sqlShow);
              setTransShow(false);
            }} className='view-form-h3'>SQL</p>

            <p onClick={() => {
              getTrans();
              setTransShow(!transShow);
              setSqlShow(false);
            }} className='view-form-h3'>Transactions</p>

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

          {sqlShow && <div className='side-window'>
            <pre>{sql}</pre>
          </div>}

          {transShow && <div className='side-window'>
            <pre>{trans}</pre>
          </div>}

        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
