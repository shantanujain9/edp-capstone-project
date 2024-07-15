import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [buttonState, setButtonState] = useState({});
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:5000/products/categories');
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams(location.search);
      const category = params.get('category') || '';
      const searchQuery = params.get('search') || '';

      try {
        const response = await axios.get('http://localhost:5000/products', {
          params: {
            category,
            search: searchQuery,
          },
        });
        setProducts(response.data);
        setSelectedCategory(category);
        setSearch(searchQuery);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const query = new URLSearchParams(location.search);
    if (category) {
      query.set('category', category);
    } else {
      query.delete('category');
    }
    navigate(`?${query.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(location.search);
    if (selectedCategory) {
      query.set('category', selectedCategory);
    }
    if (search) {
      query.set('search', search);
    } else {
      query.delete('search');
    }
    navigate(`?${query.toString()}`);
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
    <div className="products-section">
      <div className="search-and-products">
        <div className="search-filter-container">
          <h2>Products</h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary mb-3">Search</button>
          </form>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-control mb-3"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="product-list">
          {error && <p className="text-danger">{error}</p>}
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
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

export default ProductList;
