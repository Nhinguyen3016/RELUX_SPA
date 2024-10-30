import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Massages.css';
import Book from './Book';
import FaqSection from './FaqSection';
import Pexemas from '../../images/pexemas.png';
import Mare from '../../images/mare.png';
import Karoli from '../../images/karoli.png';
import Massage from '../../images/massages.png';

const Massages = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/massage-programs');
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
        <div className="massages-page">
            <div className="massage-the-service-section">
                <h2 className="massage-service-title">Massages</h2>
                <img src={Massage} alt="Service Promotion" className="massage-service-image" /> 
            </div>

            <div className="massage-programs-container">
                <div className="massage-programs-right">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        programs.map((program, index) => (
                            <div className="massage-program" key={index}>
                                <h2 className="program-title">{program.title}</h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.description}</p>
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
