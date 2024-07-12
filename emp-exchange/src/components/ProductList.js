import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

      const response = await axios.get('http://localhost:5000/products', {
        params: {
          category,
          search: searchQuery
        }
      });
      setProducts(response.data);
      setSelectedCategory(category);
      setSearch(searchQuery);
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

  return (
    <div className="container">
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
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product._id}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
