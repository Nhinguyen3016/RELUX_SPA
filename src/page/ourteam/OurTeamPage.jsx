import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/ourteam/OurTeamPage.css';
import Spa from '../../images/spa.png';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const employeeRes = await axios.get(`${API_HOST}/v1/employees?page=${currentPage}&limit=${itemsPerPage}`);
        const employees = employeeRes.data.data.map(employee => ({
          id: employee.id,
          name: employee.name,
          role: employee.specialtyType,
          img: employee.avatar,
          description: employee.description,
          location: `${employee.location.locationName}, ${employee.location.address}`,
          phone: employee.phone,
        }));
        setTeamMembers(employees);
        setTotalItems(employeeRes.data.total); // Lưu tổng số nhân viên vào state
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="team-page">
      <section className="team-banner">
        <h1>Our Team</h1>
        <img src={Spa} alt="Spa" className="spa-image-team" />
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <section className="team-members">
          {teamMembers.map((member) => (
            <div className="team-member" key={member.id}>
              <img src={member.img} alt={member.name} className="member-photo" />
              <h2>
                <Link to={`/team/${member.id}`}>{member.name}</Link>
              </h2>
              <p>{member.role}</p>
              <p>{member.location}</p>
            </div>
          ))}
        </section>
      )}

      <section className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Prev
        </button>

        {/* Displaying page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default TeamPage;
