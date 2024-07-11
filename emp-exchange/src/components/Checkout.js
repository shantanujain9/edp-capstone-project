import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');

  const handleCheckout = () => {
    // Here you would send the order to the backend for processing
    // For now, we'll just clear the cart and log the order
    console.log({
      name,
      address,
      payment,
      cart,
    });
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Information</label>
          <input
            type="text"
            className="form-control"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
