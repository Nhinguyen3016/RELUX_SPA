import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Section from './components/Section';
import Services from './components/Services';
import RelaxSection from './components/RelaxSection';
import MeetOurTeam from './components/MeetOurTeam';
import MainLayout from './layout/MainLayout'
import PagesServices from './pages/services/ServicesPage';
import SpaPrograms from './pages/services/SpaPrograms';
import BodyTreatments from './pages/services/BodyTreatments';
import Massages from './pages/services/Massages';
import Facial from './pages/services/Facials';

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Section />
              <h2 className="app-services-title">Our Services</h2>
              <Services />
              <RelaxSection />
              <MeetOurTeam />
            </>
          } />
          <Route path="/services" element={<PagesServices />} />
          <Route path="/services/spa-programs" element={<SpaPrograms />} />
          <Route path="/services/massages" element={<Massages />} />
          <Route path="/services/facials" element={<Facial />} />
          <Route path="/services/body-treatments" element={<BodyTreatments />} />
        </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;