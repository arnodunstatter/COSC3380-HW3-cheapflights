import './CSS/App.css';

import Login from './Login';
import Search from './Search';
import View from './View';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/search-flight' element={<Search/>} />
          <Route path='/view-flight' element={<View/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
