import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth } from './context/Auth';
// import { BrowserRouter } from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import { SearchProvider } from './context/Search';
import { CartProvider } from './context/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // ReactDOM.render(
    <Auth>
      <SearchProvider>
        <CartProvider>
    <React.StrictMode>
     <App/>
    </React.StrictMode>
    </CartProvider>
    </SearchProvider>
    </Auth>
    // document.getElementById('root')

  );


