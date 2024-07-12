import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './LandingPage.css';

const LandingPage = () => {
    const [searchText, setSearchText] = useState('');
    const { cart, addToCart } = useContext(CartContext);
    const cartItemCount = cart.length;
    const [buttonState, setButtonState] = useState({});

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setButtonState(prevState => ({
            ...prevState,
            [product.id]: true,
        }));
        setTimeout(() => {
            setButtonState(prevState => ({
                ...prevState,
                [product.id]: false,
            }));
        }, 2000);
    };

    const featuredProducts = [
        { id: 1, name: 'Product 1', image: 'path_to_image1', price: 10.00 },
        { id: 2, name: 'Product 2', image: 'path_to_image2', price: 15.00 },
        { id: 3, name: 'Product 3', image: 'path_to_image3', price: 20.00 }
    ];

    const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys'];

    return (
        <div className="container">
            <nav className="navbar">
                <Link className="navbar-brand" to="/">EmpExchange</Link>
                <div className="search-box">
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange}
                        placeholder="Search for products..."
                    />
                    <button onClick={() => window.location.href = `/search?query=${searchText}`}>Search</button>
                </div>
                <div className="navbar-right">
                    <Link className="nav-item" to="/products">Products</Link>
                    <Link className="nav-item" to="/cart">Cart ({cartItemCount})</Link>
                </div>
            </nav>
            <div className="categories">
                <h2>Categories</h2>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-list">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>${product.price.toFixed(2)}</p>
                            <button 
                                onClick={() => handleAddToCart(product)} 
                                className={`btn ${buttonState[product.id] ? 'btn-success' : 'btn-primary'}`}
                            >
                                {buttonState[product.id] ? 'Added!' : 'Add to Cart'}
                            </button>
                            <Link to={`/product/${product.id}`} className="btn btn-link">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
