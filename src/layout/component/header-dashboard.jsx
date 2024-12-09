import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard/Header-dashboard.css';
const Header=()=>{
    return(
        <header className="header-dashboard">
            <Link to="/dashboard" className="header-link">
            <h1>Dashboard</h1>
            </Link>
            <div className="search">
                <input type="text" placeholder="Search service" className="search-input"/>
                <button type="submit" className="search-button">Search</button>
            </div>
        </header>

    );
};
export default Header;
