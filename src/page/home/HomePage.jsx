import React from 'react';
import Home from './component/Home';
import Section from './component/Section';
import Services from './component/Services';
import RelaxSection from './component/RelaxSection';
import MeetOurTeam from './component/MeetOurTeam';
const HomePage = () => {
  return (
    <>
      <Home />
      <Section />
      <Services />
      <RelaxSection />
      <MeetOurTeam />
    </>
  );
};

export default HomePage;