import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/services/component/Facials.css';
import Book from '../../../page/services/component/Book';
import FaqSection from '../../../page/services/component/FaqSection';
import Faci from '../../../images/facialTreatment.png';
import Cop from '../../../images/cop.png';
import Dogu from '../../../images/dogu.png';
import Facial from '../../../images/facial.png';

const Facials = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/facial-programs');
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
        <div className="facial-programs-page">
            <div className="facial-the-service-section">
                <h2 className="facial-service-title">Facials</h2>
                <img src={Facial} alt="Service Promotion" className="facial-service-image" /> 
            </div>

            <div className="facial-programs-container">
                <div className="facial-programs-right">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        programs.map((program, index) => (
                            <div className="facial-program" key={index}>
                                <h2 className="program-title">{program.title}</h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.description}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="facial-programs-left">
                    <div className="image-container">
                        <img src={Faci} alt="Relaxing facial environment" className="facial-image-large" />
                        <img src={Cop} alt="Aromatic facial treatments" className="facial-image-small" />
                        <img src={Dogu} alt="Luxury facial products" className="facial-image-small" />
                    </div>
                </div>
            </div>

            <FaqSection />

            <Book />
        </div>
    );
};

export default Facials;