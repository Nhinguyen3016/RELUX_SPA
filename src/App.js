import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './App.css';
import MainLayout from './layout/MainLayout';
import MainLayoutDashboard from './layout/MainLayoutDashboard';
import HomePage from './page/home/HomePage';
import GalleryPage from './page/gallery/GalleryPage';
import GiftCardPage from './page/giftcard/GiftCardPage';

// Booking
import BookingPage from './page/booking/BookingPage';
import BookNowPage from './page/giftcard/BookNowPage';
import ThirdStep from './page/booking/components/ThirdStep';
import FourStep from './page/booking/components/FourStep';
import FiveStep from './page/booking/components/FiveStep';

// Team Our
import TeamOurPage from './page/ourteam/OurTeamPage'; 
import DetailEmployee from './page/ourteam/DetailEmployee'; 

// Other pages
import ContactPage from './page/contact/ContactPage';
import LoginPage from './page/account/login/LoginPage';
import RegisterPage from './page/account/register/RegisterPage';
import ForgotPasswordPage from './page/account/login/ForgotPasswordPage';
import OtpPage from './page/account/login/OtpPage';
import PasswordChanged from './page/account/login/PasswordChanged';
import NewPasswordPage from './page/account/login/NewPasswordPage';

// Services
import ServicesPage from './page/services/ServicesPage';  
import BodyTreatments from './page/services/component/BodyTreatments'; 
import Facials from './page/services/component/Facials';  
import Massages from './page/services/component/Massages';  
import SpaPrograms from './page/services/component/SpaPrograms';  

// Dashboard
import Dashboard from './page/dashboard/dashboard-dashboard.jsx';
import Booking from './page/dashboard/booking-dashboard.jsx';
import ServiceCategory from './page/dashboard/service-category-dashboard.jsx';
import Service from './page/dashboard/service-dashboard.jsx';
import Schedules from './page/dashboard/schedules-dashboard.jsx';
import GiftCards from './page/dashboard/giftCards-dashboard.jsx';
import AccountList from './page/dashboard/accountList.jsx';

// Profile
import ProfileUser from './page/account/account/ProfileUser';

// Delegate login permissions
import PrivateRoute from './components/PrivateRoute';  

function App() {
  return (
    <Router>

      <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <div className="App">
          <Routes>
            {/* Main Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/team-our" element={<TeamOurPage />} />
              <Route path="/team/:id" element={<DetailEmployee />} />
              <Route path="/account" element={<LoginPage />} />
              <Route path="/contacts" element={<ContactPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/change-success" element={<PasswordChanged />} />
              <Route path="/new-password" element={<NewPasswordPage />} />
              {/* Booking routes */}
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/thirdstep" element={<ThirdStep />} />
              <Route path="/fourstep" element={<FourStep />} />
              <Route path="/fivestep" element={<FiveStep />} />
              <Route path="/booknow" element={<BookNowPage />} />
              <Route path="/giftcard" element={<GiftCardPage />} />

              {/* Services routes */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/body-treatments" element={<BodyTreatments />} />
              <Route path="/services/facials" element={<Facials />} />
              <Route path="/services/massages" element={<Massages />} />
              <Route path="/services/spa-programs" element={<SpaPrograms />} />
              <Route path="/booking/:programId" element={<BookingPage />} />

              <Route path="/profile" element={<ProfileUser />} />
            </Route>

            {/* Dashboard Routes */}
            <Route element={<MainLayoutDashboard />}>
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/bookingdashboard" 
                element={
                  <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                    <Booking />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/servicecategory" 
                element={
                  <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                    <ServiceCategory />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/giftcards" 
                element={
                  <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                    <GiftCards />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/schedules" 
                element={
                  <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                    <Schedules />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/servicecategory/service" 
                element={
                  <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                    <Service />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/accountlist" 
                element={
                  <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
                    <AccountList />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
