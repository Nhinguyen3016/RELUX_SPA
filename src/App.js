import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import MainLayoutDashboard from './layout/MainLayoutDashboard';
import HomePage from './page/home/HomePage';
import GalleryPage from './page/gallery/GalleryPage';
import BookingPage from './page/booking/BookingPage';
import TeamOurPage from './page/ourteam/OurTeamPage.jsx';
import ContactPage from './page/contact/ContactPage';
import LoginPage from './page/account/login/LoginPage';
import RegisterPage from './page/account/register/RegisterPage';
import ForgotPasswordPage from './page/account/login/ForgotPasswordPage';
import NewPasswordPage from './page/account/login/NewPasswordPage';
import ServicesPage from './page/services/ServicesPage.jsx';
import BodyTreatments from './page/services/component/BodyTreatments.jsx';
import Facials from './page/services/component/Facials.jsx';
import Massages from './page/services/component/Massages.jsx';
import SpaPrograms from './page/services/component/SpaPrograms.jsx';

import Dashboard from './page/dashboard/dashboard-dashboard.jsx';
import Booking from './page/dashboard/booking-dashboard.jsx';
import ServiceCategory from './page/dashboard/service-category-dashboard.jsx';
import Feedback from './page/dashboard/feedback-dashboard.jsx';
import Service from './page/dashboard/service-dashboard.jsx';
import Staff from './page/dashboard/staff-dashboard.jsx';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/team-our" element={<TeamOurPage />} />
            <Route path="/account" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/body-treatments" element={<BodyTreatments />} />
            <Route path="/services/facials" element={<Facials />} />
            <Route path="/services/massages" element={<Massages />} />
            <Route path="/services/spa-programs" element={<SpaPrograms />} />
          </Route>

          {/* Dashboard Routes */}
          <Route element={<MainLayoutDashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookingdashboard" element={<Booking />} />
            <Route path="/servicecategory" element={<ServiceCategory />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/servicecategory/service" element={<Service />} />

          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;