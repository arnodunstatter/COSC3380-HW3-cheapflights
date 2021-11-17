import './CSS/App.css';

import Login from './Login';
import Search from './Search';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
