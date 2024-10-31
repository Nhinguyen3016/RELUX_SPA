import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './page/home/HomePage';
import GalleryPage from './page/gallery/GalleryPage';
import TeamOurPage from './page/ourteam/OurTeamPage.jsx';
import ContactPage from './page/contact/ContactPage';
import LoginPage from './page/account/login/LoginPage';
import RegisterPage from './page/account/register/RegisterPage'; 
import ForgotPasswordPage from './page/account/login/ForgotPasswordPage';
import NewPasswordPage from './page/account/login/NewPasswordPage';

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/team-our" element={<TeamOurPage />} />
            <Route path="/account" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactPage />} /> 
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;