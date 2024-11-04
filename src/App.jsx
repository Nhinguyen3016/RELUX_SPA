import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import HomePage from './page/home/HomePage.jsx';
import GalleryPage from './page/gallery/GalleryPage.jsx';
import BookingPage from './page/booking/BookingPage.jsx';
import TeamOurPage from './page/ourteam/OurTeamPage.jsx';
import ContactPage from './page/contact/ContactPage.jsx';
import LoginPage from './page/account/login/LoginPage.jsx';
import RegisterPage from './page/account/register/RegisterPage.jsx';
import ForgotPasswordPage from './page/account/login/ForgotPasswordPage.jsx';
import NewPasswordPage from './page/account/login/NewPasswordPage.jsx';
import ServicesPage from './page/services/ServicesPage.jsx';
import BodyTreatments from './page/services/component/BodyTreatments.jsx';
import Facials from './page/services/component/Facials.jsx';
import Massages from './page/services/component/Massages.jsx';
import SpaPrograms from './page/services/component/SpaPrograms.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/team-our" element={<TeamOurPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
            {/* Auth Page */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            {/* Services routes - separated */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/body-treatments" element={<BodyTreatments />} />
            <Route path="/services/facials" element={<Facials />} />
            <Route path="/services/massages" element={<Massages />} />
            <Route path="/services/spa-programs" element={<SpaPrograms />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;