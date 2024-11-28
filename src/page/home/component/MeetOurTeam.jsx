import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../styles/home/MeetOurTeam.css";
import aliceImage from '../../../images/alice.png';
import doriImage from '../../../images/dori.png';

const MeetOurTeam = () => {
  return (
    <div className="meet-our-team">
      <div className="team-info">
        <h2 className="team-title">Meet Our Team</h2>
        <p className="team-description">
          Our talented team is here to provide the best experience for you.
        </p>
        <button className="appointment-btn">Book an appointment</button>
      </div>

      <div className="team-members">
        <div className="team-member">
          <div className="team-images">
            <Link to={`/team/${teamMembers[currentIndex]?.id}`}>
              <img
                src={teamMembers[currentIndex]?.img}
                alt={`Team member ${currentIndex + 1}`}
                className="member-image"
              />
            </Link>
            <div className="arrow-container">
              <FaArrowLeft className="arrow left-arrow" onClick={handlePrev} />
              <FaArrowRight className="arrow right-arrow" onClick={handleNext} />
            </div>
            <Link
              to={`/team/${teamMembers[(currentIndex + 1) % teamMembers.length]?.id}`}
            >
              <img
                src={
                  teamMembers[(currentIndex + 1) % teamMembers.length]?.img
                }
                alt={`Team member ${(currentIndex + 1) % teamMembers.length + 1}`}
                className="member-image"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
