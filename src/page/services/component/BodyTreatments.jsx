import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../styles/services/component/BodyTreatments.css';
import Book from './Book';
import FaqSection from './FaqSection';
import Pexemas from '../../../images/massages.png';
import Elly from '../../../images/elly.png';
import Karoli from '../../../images/karoli.png';
import BodyImage from '../../../images/body.png';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const BodyTreatments = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                // Gửi yêu cầu API với categoryId = 2
                const response = await axios.get(`${API_HOST}/v1/services/category/6`);

                // Lọc và xử lý dữ liệu trả về chỉ với 3 trường: name, price, descriptionShort
                const filteredPrograms = response.data.data.map((program) => ({
                    name: program.name,
                    price: program.price,
                    descriptionShort: program.descriptionShort,
                    description1: program.description1, // Add full descriptions
                    description2: program.description2,
                    imageDescription: program.imageDescription, // Add image info
                    duration: program.duration, // Add duration if available
                }));
                setPrograms(filteredPrograms);
                setLoading(false);
            } catch (err) {
                console.error('Error while retrieving data:', err);
                setError('Failed to load programs. Please try again later.');
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []); 

    const handleProgramClick = (program) => {
        navigate(`/booking/${program.name}`, {
            state: {
                name: program.name,
                description1: program.description1,
                imageDescription: program.imageDescription,
                description2: program.description2,
                price: program.price,
                duration: program.duration
            }
        });
    };

    return (
        <div className="body-page">
            <div className="body-the-service-section">
                <h2 className="body-service-title">Body Treatments</h2>
                <img src={BodyImage} alt="Service Promotion" className="body-service-image" />
            </div>

            <div className="body-programs-container">
                <div className="body-programs-right">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        programs.map((program) => (
                            <div className="body-program" key={program.name}>
                                <h2
                                    className="program-title"
                                    onClick={() => handleProgramClick(program)} // Pass the full program data
                                >
                                    {program.name}
                                </h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.descriptionShort}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="body-programs-left">
                    <div className="image-container">
                        <img src={Pexemas} alt="Relaxing body treatment environment" className="body-image-large" />
                        <img src={Elly} alt="Aromatic body treatments" className="body-image-small" />
                        <img src={Karoli} alt="Luxury body products" className="body-image-small" />
                    </div>
                </div>
            </div>

            <FaqSection />
            <Book />
        </div>
    );
};

export default BodyTreatments;
