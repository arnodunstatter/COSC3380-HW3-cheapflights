

import Login from './Login';
import Search from './Search';
import View from './View';

import './CSS/App.css';

import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <Link className='link' to='/'>
            <p className='app-logo'>Cheap<span>Flights</span></p>
          </Link>
        </header>

        <section>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/search-flight' element={<Search/>} />
            <Route path='/view-flight' element={<View/>} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
