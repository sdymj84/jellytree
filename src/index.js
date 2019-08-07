import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ScrollMemory from 'react-router-scroll-memory'

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
      <ScrollMemory />
      <App />
    </div>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.register();
