import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';


function App(){
  return(
  <div>
    <Routes>
      <Route path="/" exact component={LandingPage} />
      <Route path="/products" component={ProductList} />
      <Route path="/product/:id" component={ProductDetail}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/checkout" component={Checkout} />
    </Routes>
  </div>
);
}
export default App;