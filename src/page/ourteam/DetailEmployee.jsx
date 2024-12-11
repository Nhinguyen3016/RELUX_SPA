import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getintouchIcon from '../../images/getintouch.svg';
import servicesIcon from '../../images/service.svg';
import hoursIcon from '../../images/hours.svg';
import Spa from '../../images/spa.png';
import FormWrapper from '../home/component/FormWrapper'; // Import FormWrapper
import '../../styles/ourteam/DetailEmployee.css';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const EmployeeDetail = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false); // State to toggle ServiceForm
  const [isServiceForm, setIsServiceForm] = useState(true); // To toggle between forms
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const response = await axios.get(`${API_HOST}/v1/employees/${id}`);
        const employeeData = response.data.data;
        setEmployee(employeeData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employee detail:', err);
        setError('Failed to load employee details. Please try again later.');
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  const avatarUrl = employee.avatar;

  const handleNext = (formData) => {
    console.log("Form Data:", formData);
    setIsServiceForm(false);
    setSelectedEmployee(formData.employee);
  };

  const handleCloseForm = () => {
    setShowServiceForm(false);
  };

  return (
    <section className="about-me-detailE">
      {/* Banner image at the top */}
      <img src={Spa} alt="Spa" className="banner-image" />

      <section className="team-banner-detail">
        <h1 className="name-detailE">{employee.name}</h1>
      </section>

      <div className="detail-container-detailE">
        <div className="image-container-detailE">
          <img
            src={avatarUrl}
            alt={`Portrait of ${employee.name}`}
            className="detail-image-detailE"
            aria-label={`Image of ${employee.name}`}
          />
        </div>

        <div className="info-detailE">
          <h2 className="section-title">About Me</h2>
          <p className="description-detailE">{employee.description}</p>

          <hr />
          <div className="contact-details-detailE">
            <div className="contact-item-detailE">
              <img
                src={getintouchIcon}
                alt="Get in Touch Icon"
                className="contact-icon-detailE"
                aria-hidden="true"
              />
              <div className="contact-content">
                <h3 className="contact-title-detailE">Get in Touch</h3>
                <p className="contact-info-detailE">{employee.phone}</p> {/* Display phone */}
              </div>
            </div>
            <hr />
            <div className="contact-item-detailE">
              <img
                src={servicesIcon}
                alt="Services Icon"
                className="contact-icon-detailE"
                aria-hidden="true"
              />
              <div className="contact-content">
                <h3 className="contact-title-detailE">Specialty Type</h3>
                <ul className="contact-info-list-detailE">
                  <li>{employee.specialtyType}</li> {/* Display specialty type */}
                </ul>
              </div>
            </div>
            <hr />

            <div className="contact-item-detailE">
              <img
                src={hoursIcon}
                alt="Working Hours Icon"
                className="contact-icon-detailE"
                aria-hidden="true"
              />
              <div className="contact-content">
                <h3 className="contact-title-detailE">Location</h3>
                <ul className="contact-info-list-detailE">
                  <li>{employee.location.locationName}</li>
                  <li>{employee.location.address}</li>
                </ul>
              </div>
            </div>
            <hr />
          </div>

          <button
            className="book-button"
            aria-label="Book an appointment"
            onClick={() => setShowServiceForm(true)} // Show the ServiceForm
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Show FormWrapper with close button */}
      {showServiceForm && (
        <div className="service-form-overlay">
          <div className="form-close-button" onClick={handleCloseForm}>
            ✕
          </div>
          <FormWrapper
            isServiceForm={isServiceForm}
            handleNext={handleNext}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedEmployee={selectedEmployee}
          />
        </div>
      )}
    </section>
  );
};

export default EmployeeDetail;
