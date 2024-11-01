import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/services/component/BodyTreatments.css';
import Book from '../../../page/services/component/Book';
import FaqSection from '../../../page/services/component/FaqSection';
import Pexemas from '../../../images/massages.png';
import Elly from '../../../images/elly.png';
import Karoli from '../../../images/karoli.png';
import BodyImage from '../../../images/body.png';

const BodyTreatments = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/programs');
                setPrograms(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error while retrieving data:', error);
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

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
                    ) : (
                        programs.map((program, index) => (
                            <div className="body-program" key={index}>
                                <h2 className="program-title">{program.title}</h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.description}</p>
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