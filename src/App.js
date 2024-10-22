import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home';
import Section from './components/Section';
import Services from './components/Services';
import RelaxSection from './components/RelaxSection';
import MeetOurTeam from './components/MeetOurTeam';
import MainLayout from './layout/MainLayout'

function App() {
  return (
    <Router>
      <div className="App">
      <MainLayout>
        <Home />
        <Section />
        <Services />
        <RelaxSection />
        <MeetOurTeam />
      </MainLayout>
      </div>
    </Router>
  );
}

export default App;