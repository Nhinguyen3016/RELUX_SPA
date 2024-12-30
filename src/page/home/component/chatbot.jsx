import { useState, useEffect } from 'react';
import '../../../styles/home/chatbot.css';
import axios from 'axios';
import logo from '../../../images/Logo.png';


function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState('welcome');
  const [isVisible, setIsVisible] = useState(true); // Trạng thái hiển thị chatbot

  useEffect(() => {
    const welcomeMessage = {
      sender: 'bot',
      text: 'Hello! Welcome to Relux Spa. How can I help you today?',
    };
    const options = [
      { sender: 'bot', text: '1.Make an appointment', clickable: true },
      { sender: 'bot', text: '2.Learn about the service', clickable: true },
      { sender: 'bot', text: '3.Ask about offers', clickable: true },
      { sender: 'bot', text: '4.Special notes about Spa ', clickable: true },
      { sender: 'bot', text: '5.Body condition advice', clickable: true },
    ];

    setMessages([welcomeMessage, ...options]);
  }, []);

  const handleClickOption = (text) => {
    setInput(text);
    sendMessage();
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);
    handleUserInput(input);
    setInput('');
  };

  const handleUserInput = (input) => {
    switch (stage) {
      case 'welcome':
        handleWelcomeOption(input);
        break;
      case 'Middle':
        handleMiddle(input);
        break;
      case 'end':
        handleEnding(input);
        break;
      default:
        break;
    }
  };

  const handleWelcomeOption = (input) => {
    const lowerInput = input.toLowerCase();
    if ((lowerInput.includes('appointment'))) {
      handleGetschedule();
    } else if (lowerInput.includes('service')) {
      handleService();
      setStage('Middle')
    }
    else if (lowerInput.includes('offers')) {
      handleOffers();
    }
    else if (lowerInput.includes('notes')) {
      handleNotes();
    }
    else if (lowerInput.includes('advice')) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Can you tell me about your current physical condition?' }]);
      setStage('Middle')
    }
    else if (lowerInput.includes('goodbye') || lowerInput.includes('thanks') || lowerInput.includes('ok')) {
      handleEnding();
    } else {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, can you re-enter?' }]);
    }
  };
  // hiện link đặt lịch 
  const handleGetschedule = async () => {
    try {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: (
            <div className="linkServey">
              <span role="gridcell">
                <a
                  className="link-servey"
                  href="http://localhost:3001"
                  target="_blank"
                >
                  Relux
                </a>
              </span>
            </div>
          ),
        },
      ]);
    } catch (error) {
      console.error('Error getting schedule link');
    }
  };
  //call Api
  const handleMiddle = async (input) => {
    const lowwerInput = input.toLowerCase();

    if (lowwerInput.includes('thanks') || lowwerInput.includes('good') || lowwerInput.includes('thank')) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Do you want me to hepl you any option?' }]);
      setStage('welcome')
    }
    else {
      try {
        const response = await axios.post('http://127.0.0.1:5000/chat', {
          message: input,
        });

        const answer = response.data?.response || "No suitable answer found.";
        setMessages(prev => [...prev, { sender: 'bot', text: answer }]);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setMessages(prev => [...prev, { sender: 'bot', text: 'An error occurred while calling the API. Please try again later.' }]);
      }
    }

  };
  //hàm gọi dịch vụ
  const handleService = async (input) => {
    try {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: (
            <div className="offers">
              <p>1.Mandila Full Care</p>
              <p>2.Body Detoxing Care</p>
              <p>3.Warm Stone Massage</p>
              <p>4.Aromatherapy Massage</p>
              <p>5.Thai Massage Stretch</p>
              <p>6.Back & Neck Massage</p>
              <p>7.Foot Massage</p>
              <p>8.Head Massage</p>
              <p>9.Green Tea Body Scrub</p>
              <p>10.Coffee Body Scrub</p>
              <p>11.Manicure & Pedicure</p>
              <p>12.Steam Bath</p>
            </div>
          ),
        },
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'An error occurred. Please try again later.' }]);
    }
  };
  //hàm gọi ưu đãi
  const handleOffers = async (input) => {
    try {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: (
            <div className="offers">
              <p>Customers who order any service more than three times will receive the following incentives:</p>
              <p>1.Mandila Full Care: Book a session for two and get a 15% discount.</p>
              <p>2.Body Detoxing Care: Receive a free consultation for bookings over 900,000 VND.</p>
              <p>3.Warm Stone Massage: Book a session for two and get a 15% discount.</p>
              <p>4.Aromatherapy Massage: Get a free bottle of essential oil for bookings over 700,000 VND.</p>
              <p>5.Thai Massage Stretch: Enjoy a complimentary herbal tea after the session.</p>
              <p>6.Back & Neck Massage: Book 3 sessions and get the 4th session free.</p>
              <p>7.Foot Massage: Get a 10% discount for bookings made before 6 PM.</p>
              <p>8.Head Massage: Book with another massage service and get 20% off the Head Massage.</p>
              <p>9.Green Tea Body Scrub: Get a free mini green tea face mask for every session.</p>
              <p>10.Coffee Body Scrub: Book any two treatments and receive a 10% discount.</p>
              <p>11.Manicure & Pedicure: Book a group appointment (3+ people) and get 20% off each session.</p>
              <p>12.Steam Bath: Combine with any other therapy and get 50% off the Steam Bath session.</p>
            </div>
          ),
        },
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'An error occurred. Please try again later.' }]);
    }
  };
  //hàm gọi dịch vụ
  const handleNotes = async (input) => {
    try {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: (
            <div className="notes">
              <p>Here are some special notes about our Spa services: </p>
              <p>1.Book your appointment in advance: Please book your appointment at least 1 day in advance to ensure the best preparation for your session.</p>
              <p>2.Arrive on time: Please arrive on time or 10 minutes earlier to prepare and fully enjoy your spa session.</p>
              <p>3.Allergies to products: If you have any allergies to essential oils or products used during treatments, please inform our staff before starting the session.</p>
              <p>4.Schedule and service changes: If you need to change your schedule or service, please notify us at least 24 hours in advance.</p>
              <p>5.Privacy and safety: All customer personal information will be kept strictly confidential and will not be shared with third parties.</p>
              <p>6.Services for all age groups: Some treatments may not be suitable for children or pregnant women. Please ask our staff if you need more details before booking.</p>
              <p>7.Disclose your health condition: If you have any health concerns, chronic illnesses, or are in an unstable health condition, inform our staff before starting your treatment.</p>
            </div>
          ),
        },
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'An error occurred. Please try again later.' }]);
    }
  };

  const handleEnding = () => {
    setMessages(prev => [...prev, { sender: 'bot', text: 'Glad to have been of any help! Thanks for using the system!' }]);
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev); // Ẩn hoặc hiện chatbot
  };

  if (!isVisible) {
    return null; // Không hiển thị gì khi ẩn chatbot
  }

  return (
    <div className="chatbot-container">
      {/* Nút X để tắt chatbot */}
      <div className="chatbot-header">
        <div className="chatbot-logo">
          <img className="chatbot-icon" src={logo} alt="" />
          <h3 className="chatbot-title">Relux</h3>
        </div>
        <button className="close-button-chatbox" onClick={toggleVisibility}>
          &#10005;
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
            onClick={() => msg.clickable && handleClickOption(msg.text)}
            style={{ cursor: msg.clickable ? 'pointer' : 'default' }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
