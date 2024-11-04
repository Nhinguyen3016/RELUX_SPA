import React from 'react';
import Home from './component/Home';
import Section from './component/Section';
import Services from './component/Services';
import RelaxSection from './component/RelaxSection';
import MeetOurTeam from './component/MeetOurTeam';
import BookingSheetContainer from '../booking/BookingSheetContainer';

const HomePage = () => {
  return (
    <>
      <Home />
      <Section />
      <Services />
      <RelaxSection />
      <MeetOurTeam />
      <BookingSheetContainer />
    </>
  );
};

export default HomePage;