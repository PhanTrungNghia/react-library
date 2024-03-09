import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // Use BrowserRouter wrapping our App component to use route inside the component app
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

