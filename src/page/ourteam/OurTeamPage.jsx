import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ourteam/OurTeamPage.css';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of team members displayed per page

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${API_HOST}/v1/employees`);
        const employees = response.data.data.map(employee => ({
          id: employee.id,
          name: employee.name,
          role: employee.specialtyType, // Maps 'specialtyType' to 'role'
          img: employee.avatar,
          description: employee.description,
          location: `${employee.location.locationName}, ${employee.location.address}`,
        }));
        setTeamMembers(employees);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = teamMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  return (
    <div className="team-page">
      <section className="team-banner">
        <h1>Our Team</h1>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <section className="team-members">
          {currentMembers.map((member) => (
            <div className="team-member" key={member.id}>
              <img src={member.img} alt={member.name} className="member-photo" />
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <p>{member.location}</p>
              <p>{member.description}</p>
            </div>
          ))}
        </section>
      )}

      <section className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </section>
    </div>
  );
};

export default TeamPage;
