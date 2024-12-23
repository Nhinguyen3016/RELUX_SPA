import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/dashboard/contact-dashboard.css';

const API_BASE_URL = 'http://localhost:3000/dashboard';

const ContactMenu = () => {
    const [contact, setContact] = useState([]);


    const fetchContact = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/contact`);
            setContact(response.data.contact);
        } catch (error) {
            console.error('Error fetching data:', error);
            setContact([]);
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);
    return (
        <div className="contact-container-dashboard">
        <header className="contact-header-dashboard">
          <h2>List Contact</h2>
        </header>
        <table className="contact-table-dashboard">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contact.length > 0 ?(
            contact.map((item, index) => (
              <tr key={index}>
                <td>{item.CustomerName || 'N/A'}</td>
                <td>{item.Email || 'N/A'}</td>
                <td>{item.Message || 'N/A'}</td>
              </tr>
            ))
            ) : (
              <tr>
                <td>No schedules data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
};

export default ContactMenu;
