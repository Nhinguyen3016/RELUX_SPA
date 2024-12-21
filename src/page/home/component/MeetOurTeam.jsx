import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../../styles/home/MeetOurTeam.css";
import aliceImage from '../../../images/alice.png';
import doriImage from '../../../images/dori.png';

const MeetOurTeam = () => {
  // Define team members
  const teamMembers = [
    { id: 1, name: "Alice", img: aliceImage },
    { id: 2, name: "Dori", img: doriImage },
    // Add more team members if necessary
  ];

  // State for the current team member index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle previous team member
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  // Handle next team member
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

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
            <Link to={`/team/${teamMembers[(currentIndex + 1) % teamMembers.length]?.id}`}>
              <img
                src={teamMembers[(currentIndex + 1) % teamMembers.length]?.img}
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
