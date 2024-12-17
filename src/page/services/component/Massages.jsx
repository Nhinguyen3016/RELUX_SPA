import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../styles/services/component/Massages.css';
import Book from '../../../page/services/component/Book';
import FaqSection from '../../../page/services/component/FaqSection';
import Pexemas from '../../../images/pexemas.png';
import Mare from '../../../images/mare.png';
import Karoli from '../../../images/karoli.png';
import Massage from '../../../images/massages.png';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const Massages = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                // Fetch data with categoryId = 3 for massages
                const response = await axios.get(`${API_HOST}/v1/services/category/8`);

                // Process the response to extract relevant fields
                const filteredPrograms = response.data.data.map((program) => ({
                    name: program.name,
                    price: program.price,
                    descriptionShort: program.descriptionShort,
                    description1: program.description1,  // Full description
                    description2: program.description2,  // Full description
                    imageDescription: program.imageDescription,  // Image info
                    duration: program.duration,  // Duration info
                }));
                setPrograms(filteredPrograms);
                setLoading(false);
            } catch (error) {
                console.error('Error while retrieving data:', error);
                setError('Failed to load programs. Please try again later.');
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    // Handle program click for navigation
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
        <div className="massages-page">
            <div className="massage-the-service-section">
                <h2 className="massage-service-title">Facial & Head Treatments</h2>
                <img src={Massage} alt="Service Promotion" className="massage-service-image" />
            </div>

            <div className="massage-programs-container">
                <div className="massage-programs-right">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        programs.map((program) => (
                            <div className="massage-program" key={program.name}>
                                <h2
                                    className="program-title"
                                    onClick={() => handleProgramClick(program)}  // Pass full program data
                                >
                                    {program.name}
                                </h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.descriptionShort}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="massage-programs-left">
                    <div className="image-container">
                        <img src={Pexemas} alt="Relaxing massage environment" className="massage-image-large" />
                        <img src={Mare} alt="Aromatic massage treatments" className="massage-image-small" />
                        <img src={Karoli} alt="Luxury massage products" className="massage-image-small" />
                    </div>
                </div>
            </div>

            <FaqSection />

            <Book />
        </div>
    );
};

export default Massages;
