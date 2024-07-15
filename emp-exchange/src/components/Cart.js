import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="cart-section">
      <h2 className="cart-header">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((product, index) => (
              <li key={index} className="cart-list-item">
                <span>{product.name}</span>
                <span>${product.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(product.uniqueId)} className="btn btn-danger btn-sm">Remove</button>
              </li>
            ))}
          </ul>
          <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
          <div className="cart-actions">
            <Link to="/checkout" className="btn btn-success">Checkout</Link>
            <button onClick={clearCart} className="btn btn-danger">Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
