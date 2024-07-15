import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './LandingPage.css';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.length;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${search}`);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="hero">
        <h1>Welcome to EmpExchange</h1>
        <p>Your one-stop shop for the best products.</p>
        <Link to="/products" className="btn btn-hero">Shop Now</Link>
        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for products..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="categories">
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category}>
              <Link to={`/products?category=${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {featuredProducts.map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <Link to={`/product/${product._id}`} className="btn btn-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
