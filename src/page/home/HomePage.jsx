import React, { useRef } from 'react';
import Home from './component/Home';
import Section from './component/Section';
import Services from './component/Services';
import RelaxSection from './component/RelaxSection';
import MeetOurTeam from './component/MeetOurTeam';
const HomePage = () => {
  // Create a ref for the Section component
  const sectionRef = useRef(null);

  return (
    <>
      <Home sectionRef={sectionRef} />
      <Section ref={sectionRef} /> {/* Attach ref here */}
      <Services />
      <RelaxSection />
      <MeetOurTeam sectionRef={sectionRef} />
    </>
  );
};

export default HomePage;
