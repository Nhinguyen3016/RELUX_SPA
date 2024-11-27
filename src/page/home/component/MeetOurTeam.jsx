import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../styles/home/MeetOurTeam.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:3000";

const MeetOurTeam = ({ sectionRef }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_HOST}/v1/employees?page=${currentPage}&limit=${itemsPerPage}`
        );
        const members = res.data.data.map((employee) => ({
          id: employee.id,
          name: employee.name,
          role: employee.specialtyType,
          img: employee.avatar,
          description: employee.description,
          location: `${employee.location.locationName}, ${employee.location.address}`,
          phone: employee.phone,
        }));
        setTeamMembers(members);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Failed to load team members.");
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [currentPage]);

  const handleScrollToSection = () => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="meet-our-team">
      <div className="team-info">
        <h2 className="team-title">Meet Our Team</h2>
        <p className="team-description">
          Our talented team is here to provide the best experience for you.
        </p>
        <button className="appointment-btn" onClick={handleScrollToSection}>
          Book an appointment
        </button>
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
