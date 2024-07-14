import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    for (let i = 0; i < quantity; i++) {
      updatedCart.push({ ...product, uniqueId: `${product._id}-${i}` });
    }
    setCart(updatedCart);
  };

  const removeFromCart = (uniqueId) => {
    const updatedCart = cart.filter(product => product.uniqueId !== uniqueId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
