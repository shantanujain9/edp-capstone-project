import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import {CartProvider} from './contexts/CartContext';

function App() {
  return (
   
    <div className="App">
       <Routes>

            <Route path="/" element ={<LandingPage/>}/>
            <Route path="/products" component={""}/>
            <Route path ="/search" component={""}/>
            <Route path = "/category/:category" component={""}/>
            <Route path ="/product/:id" component={""}/> 
      <Route path="/cart" component={Cart}/>
      <Route path="/checkout" component={Checkout} />
        </Routes>
      </div>
  );
}

export default App;