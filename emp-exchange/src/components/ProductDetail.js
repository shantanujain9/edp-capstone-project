import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product:', id);
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        console.log('Product fetched:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
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
    </div>
  );
};

export default ProductDetail;
