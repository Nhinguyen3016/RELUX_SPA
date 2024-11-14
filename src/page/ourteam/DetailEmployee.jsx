import React from 'react';
import aliceImage from '../../images/alice.png';
import getintouchIcon from '../../images/getintouch.svg';
import servicesIcon from '../../images/service.svg';
import hoursIcon from '../../images/hours.svg';
import '../../styles/ourteam/DetailEmployee.css';

const DoriStuartDetail = () => {
  return (
    <section className="about-me-detail">
      <div className="detail-container">
        <img src={aliceImage} alt="Dori Stuart" className="detail-image" />
        <div className="info">
          <h1>Dori Stuart</h1>
          <p>
            For your convenience, there are more than 20 different massage therapists who
            are great professionals, ready to make your body more beautiful.
          </p>
          <p>
            If you've got no time to book the service on the phone, then use our marvelous online
            booking. All you need is to pick the appropriate service, available time, and a therapist.
            Then fill the contact form and that's all.
          </p>
          <div className="contact">
            <div>
              <img src={getintouchIcon} alt="Get in Touch Icon" className="contact-icon-detail" />
              <h3>Get in Touch</h3>
              <p>+(84) 123456789</p>
            </div>
            <div>
              <img src={servicesIcon} alt="Services Icon" className="contact-icon-detail" />
              <h3>Services</h3>
              <p>2 Day Programs</p>
              <p>Body Relaxation</p>
            </div>
            <div>
              <img src={hoursIcon} alt="Hours Icon" className="contact-icon-detail" />
              <h3>Hours</h3>
              <p>Mon-Tue: 8:00 am - 5:00 pm</p>
              <p>Wednesday: 8:00 am - 12:00 pm</p>
              <p>Thursday: 8:00 am - 5:00 pm</p>
              <p>Friday: 8:00 am - 12:00 pm</p>
            </div>
          </div>
          <button className="book-btn">Book an appointment</button>
        </div>
      </div>
    </section>
  );
};

export default DoriStuartDetail;
