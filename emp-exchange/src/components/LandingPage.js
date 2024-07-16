import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './LandingPage.css';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { cart, addToCart } = useContext(CartContext);
  const cartItemCount = cart.length;
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState({});
  const [quantities, setQuantities] = useState({});

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

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    addToCart(product, quantity);
    setButtonState((prevState) => ({
      ...prevState,
      [product._id]: true,
    }));
    setTimeout(() => {
      setButtonState((prevState) => ({
        ...prevState,
        [product._id]: false,
      }));
    }, 2000);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <Link className="navbar-brand" to="/"> The Umbrella Store</Link>
        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for products..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="navbar-right">
          <Link className="nav-item" to="/products">Products</Link>
          <Link className="nav-item" to="/cart">Cart ({cartItemCount})</Link>
        </div>
      </nav>

      <div className="hero">
        <h1>Welcome to Umbrella Store</h1>
        <p>Your one-stop shop for the best products.</p>
        <Link to="/products" className="btn btn-hero">Shop Now</Link>
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
              <input
                type="number"
                min="1"
                value={quantities[product._id] || 1}
                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                className="quantity-input"
              />
              <button
                onClick={() => handleAddToCart(product)}
                className={`btn ${buttonState[product._id] ? 'btn-success' : 'btn-primary'}`}
              >
                {buttonState[product._id] ? 'Added!' : 'Add to Cart'}
              </button>
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
