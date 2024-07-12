// components/CategoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/category/${category}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div className="container">
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4" key={product._id}>
                        <div className="card">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
