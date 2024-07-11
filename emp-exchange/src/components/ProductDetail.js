import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';

const ProductDetail = ({ match }) => {
  const { id } = match.params;
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">${product.price}</p>
          <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
