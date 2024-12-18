import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/header.css';
const Header=()=>{
    return(
        <header className="header">
            <Link to="/">
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
