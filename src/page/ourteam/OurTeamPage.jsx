import React, { useState } from 'react';
import '../../styles/ourteam/OurTeamPage.css';

import bannerImage from '../../images/gall0.svg';
import aliceImage from '../../images/alice.png';
import doriImage from '../../images/dori.png';

const TeamPage = () => {
  const teamMembers = [
    { name: 'Alice Doue', role: 'Beauty therapist', img: aliceImage },
    { name: 'Dori Stuart', role: 'Beauty therapist', img: doriImage },
    { name: 'Elly Faritale', role: 'Beauty therapist', img: aliceImage },
    { name: 'Rachel Green', role: 'Beauty therapist', img: aliceImage },
    { name: 'Susan Geller', role: 'Beauty therapist', img: aliceImage },
    { name: 'Diana Milos', role: 'Beauty therapist', img: aliceImage },
    { name: 'Rachel Green', role: 'Beauty therapist', img: aliceImage },
    { name: 'Susan Geller', role: 'Beauty therapist', img: aliceImage },
    { name: 'Diana Milos', role: 'Beauty therapist', img: aliceImage },
    { name: 'Rachel Green', role: 'Beauty therapist', img: aliceImage },
    { name: 'Susan Geller', role: 'Beauty therapist', img: aliceImage },
    { name: 'Diana Milos', role: 'Beauty therapist', img: aliceImage },
  ];

  const itemsPerPage = 9; // Số lượng nhân viên hiển thị mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = teamMembers.slice(indexOfFirstMember, indexOfLastMember);

  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  return (
    <div className="team-page">
      <section className="team-banner">
        <h1>Our Team</h1>
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </section>

      <section className="team-members">
        {currentMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.img} alt={member.name} className="member-photo" />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
          </div>
        ))}
      </section>

      <section className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default TeamPage;
