import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { CartContext } from '../contexts/CartContext';
import './ProductList.css'; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { addToCart } = useContext(CartContext);
  const [buttonState, setButtonState] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      if (search) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [search, category, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setButtonState(prevState => ({
      ...prevState,
      [product._id]: true,
    }));
    setTimeout(() => {
      setButtonState(prevState => ({
        ...prevState,
        [product._id]: false,
      }));
    }, 2000); // Reset button state after 2 seconds
  };

  return (
    <div className="container">
      <h2>Products</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
        >
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-4" key={product._id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
