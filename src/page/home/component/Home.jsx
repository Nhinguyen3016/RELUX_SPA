<<<<<<< HEAD
=======
import React, { useState } from "react";
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
import "../../../styles/home/Home.css";
import homeImage from "../../../images/homeImage.png";
import helpIcon from "../../../images/help.png";
import helpArrow from "../../../images/help-arrow.png";
<<<<<<< HEAD
import { useSheetBooking } from "../../../context/SheetContext";

const Home = () => {
  const { toggleShow } = useSheetBooking();
=======


const Home = () => {
  const [showBookingForm, setShowBookingForm] = useState(false); 

  const handleBookAppointment = () => {
    setShowBookingForm(true); 
  };

>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
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
            Younger face, elongated oval, smoothing nasolabial folds, chin lift. Younger and toned face after the first procedure.
          </p>
<<<<<<< HEAD
          <button className="appointment-btn" onClick={toggleShow}>Book an appointment</button>
=======
          <button className="appointment-btn" onClick={handleBookAppointment}>
            Book an appointment
          </button>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
        </div>
      </div>

    

      <div className="help-container">
        <div className="message">
          <span>Hello, Can I help you?</span>
        </div>
        <div className="icon-arrow-container">
          <div className="help-icon">
            <img src={helpIcon} alt="Help Icon" />
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
