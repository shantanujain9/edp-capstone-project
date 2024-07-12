import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

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
    history.push(`/products?search=${search}`);
  };

  return (
    <div className="container">
      <h1>Welcome to EmpExchange</h1>
      <form onSubmit={handleSearch} className="mb-3">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">Search</button>
      </form>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>
            <Link to={`/products?category=${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
      <h2>Featured Products</h2>
      <div className="row">
        {featuredProducts.map(product => (
          <div className="col-md-4" key={product._id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
                <Link to={`/product/${product._id}`} className="btn btn-primary">
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

export default LandingPage;
