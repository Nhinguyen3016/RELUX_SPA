import React from 'react';
import '../styles/MeetOurTeam.css';
import aliceImage from '../images/alice.png';
import doriImage from '../images/dori.png';

const MeetOurTeam = () => {
  return (
    <div className="meet-our-team">
      <div className="team-info">
        <h2 className="team-title">Meet Our Team</h2>
        <p className="team-description">
          Our crazy-talented master stylists will connect with you on a personal level, using their creativity and skill to envision a natural style
        </p>
        <button className="appointment-btn">Book an appointment</button>
      </div>
      <div className="team-members">
        <div className="team-member">
          <img src={aliceImage} alt="Alice Doue" className="member-image" />
          <h3 className="member-name">Alice Doue</h3>
          <p className="member-role">Beauty therapist</p>
        </div>
        <div className="team-member">
          <img src={doriImage} alt="Dori Stuart" className="member-image" />
          <h3 className="member-name">Dori Stuart</h3>
          <p className="member-role">Beauty therapist</p>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
