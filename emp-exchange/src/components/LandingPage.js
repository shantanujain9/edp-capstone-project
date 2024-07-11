import React from 'react';
import {Link} from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container">
            <h1>Welcome to EmpExchange</h1>
            <Link to="/products">Browse Products</Link>
        </div>
    );
};

export default LandingPage;