import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../../styles/dashboard/Header-dashboard.css';
const Header=()=>{
    const navigate = useNavigate();
    const handleLogout = async () => {
        
        try {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userRole");
            navigate("/");
        } catch (error) {
          console.error("Error during logout:", error);
          alert("Failed to logout. Please try again.");
        }
      };

    return(
        <header className="header-dashboard">
            <Link to="/dashboard" className="header-link">
            <h1>Dashboard</h1>
            </Link>
            <div className="search">
                <input type="text" placeholder="Search service" className="search-input"/>
                <button type="submit" className="search-button">Search</button>
            </div>
            <button className="btn_logout" onClick={handleLogout}> Logout </button>
        </header>

    );
};
export default Header;
