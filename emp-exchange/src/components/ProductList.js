import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [search, category]);

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

    return (
        <div className="container">
            <h2>Products</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-control"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Category1">Category1</option>
                    <option value="Category2">Category2</option>
                    <option value="Category3">Category3</option>
                    {/* Add more categories as needed */}
                </select>
            </div>
            <div className="row">
                {filteredProducts.map(product => (
                    <div className="col-md-4" key={product._id}>
                        <div className="card">
                            <Link to={`/product/${product._id}`}>
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">${product.price}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
