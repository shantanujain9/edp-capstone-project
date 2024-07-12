import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleClear = () => {
        clearCart();
    };

    return (
        <div className="cart container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map(product => (
                            <li key={product._id} className="cart-item">
                                <img src={product.image} alt={product.name} />
                                <div>
                                    <h4>{product.name}</h4>
                                    <p>${product.price}</p>
                                    <button onClick={() => handleRemove(product._id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-actions">
                        <button onClick={handleClear}>Clear Cart</button>
                        <Link to="/checkout">
                            <button>Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
