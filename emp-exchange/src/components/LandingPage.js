import React, { useState }  from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

const LandingPage = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const featuredProducts = [
        {id: 1, name: 'Product 1', image: 'path_to_image1'},
        {id: 2, name: 'Product 2', image: 'path_to_image2'},
        {id: 3, name: 'Product 3', image: 'path_to_image3'}
    ];

    const categories = ['Electronics', 'Books', 'Clothing','Home','Toys'];

    return (
            <div className="container">
                <h1>Welcome to EmpExchange</h1>
                <div className="search-box">
                   
                    <input 
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange}
                        placeholder="Search for products..."
                    />
                    <Link to={`/search?query=${searchText}`}>Search</Link>
                </div>
                <div className ="categories">
                    <h2>Categories</h2>
                    <ul>
                        {categories.map((category,index) => (
                            <li key ={index}>
                                <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="featured-products">
                    <h2>Featured Products</h2>
                    <div className ="product-list">
                        {featuredProducts.map((product) =>(
                            <div key={product.id} className="product-item">
                                <img src={product.image} alt={product.name}/>
                                <h3>{product.name}</h3>
                                <Link to={`/product/${product.id}`}>View Details</Link>
                             </div>
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default LandingPage;