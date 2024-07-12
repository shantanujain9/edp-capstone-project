import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recommendation.css';

const Recommendation = ({ productId }) => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`/api/recommendations/${productId}`);
                setRecommendedProducts(response.data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [productId]);

    return (
        <div className="recommendations">
            <h2>Recommended Products</h2>
            <div className="product-list">
                {recommendedProducts.map(product => (
                    <div key={product._id} className="product-item">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendation;