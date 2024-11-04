import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './layout/component/header/header.jsx';
import Sidebar from './layout/component/sidebar/sidebar.jsx';
import ServiceMenu from './components/service-category.js';
import Dashboard from './components/dashboard.js';
import Feedback from './components/feedback.js';
import Booking from './components/booking.js';
import ServicePackage from './components/service.js';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="main-container">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="service-content">
            <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/service" element={<ServiceMenu />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/service/package" element={<ServicePackage />} />
            </Routes>
          </div>
        </div>
      </div> 
    </BrowserRouter>  
  );
}

export default App;