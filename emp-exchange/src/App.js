import React, { useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import About from './components/About'; // Additional Page
import Contact from './components/Contact'; // Additional Page
import Footer from './components/Footer'; // Footer Component

function App() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">EmpExchange</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
            {isAuthenticated && (
              <div className="navbar-right">
                <span className="navbar-text">Logged in as {user.email}</span>
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} /> {/* Additional Route */}
        <Route path="/contact" element={<Contact />} /> {/* Additional Route */}
      </Routes>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}

export default App;
