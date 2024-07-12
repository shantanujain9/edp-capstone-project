import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';  // Adjust the path if needed
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  const getRecommendations = async () => {
    const response = await axios.post('http://localhost:5000/products/recommend', { product });
    setRecommendations(response.data);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)} className="btn btn-primary">
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
              <li key={index}>{rec.name} - ${rec.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
