import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SpaPrograms.css';
import Book from './Book';
import FaqSection from './FaqSection';
import Pexe from '../../images/pexe.png';
import Cop from '../../images/cop.png';
import Karoli from '../../images/karoli.png';
import Spa from '../../images/spa.png';

const SpaPrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/spa-programs');
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
        <div className="services-container">
            <div className="spa-the-service-section">
                <h2 className="spa-service-title">Spa Programs</h2>
                <img src={Spa} alt="Service Promotion" className="spa-service-image" />
            </div>

            <div className="spa-programs-container">
                <div className="spa-programs-right">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        programs.map((program) => (
                            <div key={program.id} className="spa-program">
                                <h2 className="program-title">{program.title}</h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.description}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="spa-programs-left">
                    <div className="image-container">
                        <img src={Pexe} alt="Relaxing spa environment" className="spa-image-large" />
                        <img src={Cop} alt="Aromatic spa treatments" className="spa-image-small" />
                        <img src={Karoli} alt="Luxury spa products" className="spa-image-small" />
                    </div>
                </div>
            </div>

            <FaqSection />

            <Book />
        </div>
    );
};

export default SpaPrograms;
