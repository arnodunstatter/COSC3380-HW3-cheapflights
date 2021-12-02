import React from "react";
import ReactDOM from "react-dom";
import "./components/CSS/index.css";
import App from "./components/App";
import { store } from './components/redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
