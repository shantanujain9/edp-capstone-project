import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>
);

// The following commented-out code from your file is kept for reference if needed
/*
// The following commented-out code from your file is kept for reference if needed
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
reportWebVitals();
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals