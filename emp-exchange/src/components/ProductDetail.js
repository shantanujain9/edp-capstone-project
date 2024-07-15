import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post('http://localhost:5000/products/recommend', { product });
      console.log('Recommendations response:', response.data); // Add this line to log the response
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Error fetching recommendations');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        className="quantity-input"
      />
      <button onClick={handleAddToCart} className="btn btn-primary">
        Add to Cart
      </button>
      <button onClick={getRecommendations} className="btn btn-secondary">
        Get Recommendations
      </button>
      {recommendations.length > 0 && (
        <div>
          <h3>Recommended Products</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec.name} - ${rec.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default ProductDetail;
