import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [order, setOrder] = useState({
        name: '',
        address: '',
        paymentInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit order to the backend
        fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order, cart })
        })
            .then(response => response.json())
            .then(data => {
                clearCart();
                alert('Order placed successfully!');
            })
            .catch(error => console.error('Error during checkout:', error));
    };

    return (
        <div className="checkout container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={order.name} onChange={handleChange} required />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={order.address} onChange={handleChange} required />
                </label>
                <label>
                    Payment Info:
                    <input type="text" name="paymentInfo" value={order.paymentInfo} onChange={handleChange} required />
                </label>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
