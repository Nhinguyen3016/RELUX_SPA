import React from 'react';
import aliceImage from '../../images/alice.png';
import getintouchIcon from '../../images/getintouch.svg';
import servicesIcon from '../../images/service.svg';
import hoursIcon from '../../images/hours.svg';
import '../../styles/ourteam/DetailEmployee.css';

const DoriStuartDetail = () => {
  return (
    <section className="about-me-detailE">
      <div className="detail-container-detailE">
        <div className="image-container-detailE">
          <img
            src={aliceImage}
            alt="Portrait of Dori Stuart"
            className="detail-image-detailE"
            aria-label="Image of Dori Stuart"
          />
        </div>

        <div className="info-detailE">
          <h2 className="section-title">About Me</h2>
          <h1 className="name-detailE">Dori Stuart</h1>
          <p className="description-detailE">
            Welcome! With over 20 professional massage therapists on our team, we’re here to help
            you feel your best. Relax, rejuvenate, and let us pamper you!
          </p>
          <p className="description-detailE">
            Prefer booking online? Simply select your desired service, time slot, and therapist, then
            complete the contact form. It's quick and hassle-free!
          </p>

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
                <p className="contact-info-detailE">+(84) 123-456-789</p>
              </div>
            </div>

            <div className="contact-item-detailE">
              <img
                src={servicesIcon}
                alt="Services Icon"
                className="contact-icon-detailE"
                aria-hidden="true"
              />
              <div className="contact-content">
                <h3 className="contact-title-detailE">Services</h3>
                <ul className="contact-info-list-detailE">
                  <li>2-Day Programs</li>
                  <li>Body Relaxation</li>
                </ul>
              </div>
            </div>

            <div className="contact-item-detailE">
              <img
                src={hoursIcon}
                alt="Working Hours Icon"
                className="contact-icon-detailE"
                aria-hidden="true"
              />
              <div className="contact-content">
                <h3 className="contact-title-detailE">Working Hours</h3>
                <ul className="contact-info-list-detailE">
                  <li>Mon-Tue: 8:00 AM - 9:00 PM</li>
                  <li>Wed-Fri: 8:00 AM - 10:00 PM</li>
                  <li>Sat-Sun: 9:00 AM - 11:00 PM</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            className="book-button"
            aria-label="Book an appointment"
            onClick={() => alert('Redirect to booking page!')}
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};


export default DoriStuartDetail;
