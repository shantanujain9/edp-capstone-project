import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CategoryPage from './components/CategoryPage'; // Add this import
import { CartProvider } from './contexts/CartContext';
import './App.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/category/:category" element={<CategoryPage />} /> {/* Add this route */}
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
