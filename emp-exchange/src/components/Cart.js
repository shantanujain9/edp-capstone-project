import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((product, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {product.name}
                <span>${product.price}</span>
                <button onClick={() => removeFromCart(product.uniqueId)} className="btn btn-danger btn-sm">Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link to="/checkout" className="btn btn-success">Checkout</Link>
          <button onClick={clearCart} className="btn btn-danger">Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
