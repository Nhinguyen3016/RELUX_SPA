import React, { useState } from "react";
import "../../../styles/home/Home.css";
import homeImage from "../../../images/homeImage.png";
import helpIcon from "../../../images/help.png";
import helpArrow from "../../../images/help-arrow.png";
import Chatbot from '../component/chatbot';

const Home = ({ sectionRef }) => {
  const [showChatbot, setShowChatbot] = useState(true); // Đặt giá trị ban đầu là true để chatbot luôn hiển thị

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  // Cuộn đến Section khi nhấn nút
  const handleBookAppointment = () => {
    if (sectionRef && sectionRef.current) {
      const serviceFormElement = sectionRef.current.querySelector('.service-form');
      if (serviceFormElement) {
        serviceFormElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="home">
      <div className="home-content">
        <div className="home-text-left">
          <h1>
            <span>Let Your Body</span>
            <span>Rest Today</span>
          </h1>
        </div>
        <div className="home-image">
          <img src={homeImage} alt="Facial Treatment" />
        </div>
        <div className="home-text-right">
          <div className="contact-info">
            <span role="img" aria-label="phone">
              📞
            </span>
            <p>(+84) 123456789</p>
          </div>
          <p className="description">
            Younger face, elongated oval, smoothing nasolabial folds, chin lift.
            Younger and toned face after the first procedure.
          </p>
          <button className="appointment-btn" onClick={handleBookAppointment}>
            Book an appointment
          </button>
        </div>
      </div>

      <div className="help-container">
        <div className="message">
          <span>Hello, Can I help you?</span>
          {showChatbot && (<div className="chatbot-modal"><Chatbot /></div>)}
        </div>
        <div className="icon-arrow-container">
          <div className="help-icon">
            <img src={helpIcon} alt="Help Icon" onClick={toggleChatbot} />
          </div>
          <div className="help-arrow">
            <img src={helpArrow} alt="Help Arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
