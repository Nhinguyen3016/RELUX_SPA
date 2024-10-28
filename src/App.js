import React from 'react';
import { Route, Routes} from 'react-router-dom';
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NewPasswordPage from './pages/NewPasswordPage';
import "./App.css"

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
          </Route>
      </Routes>
    </>
  );
}

export default App;