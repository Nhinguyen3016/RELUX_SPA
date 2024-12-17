import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import '../../../styles/services/component/SpaPrograms.css';
import Book from '../../../page/services/component/Book';
import FaqSection from '../../../page/services/component/FaqSection';
import Pexe from '../../../images/pexe.png';
import Cop from '../../../images/cop.png';
import Karoli from '../../../images/karoli.png';
import Spa from '../../../images/spa.png';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const SpaPrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                // Gửi yêu cầu API với categoryId = 4
                const response = await axios.get(`${API_HOST}/v1/services/category/9`);
                

                // Lọc và xử lý dữ liệu trả về với các trường đầy đủ
                const filteredPrograms = response.data.data.map((program) => ({
                    name: program.name,
                    price: program.price,
                    descriptionShort: program.descriptionShort,
                    description1: program.description1, // Full description
                    description2: program.description2, // Full description
                    imageDescription: program.imageDescription, // Image info
                    duration: program.duration, // Duration of the treatment
                }));
                setPrograms(filteredPrograms);
                setLoading(false);
            } catch (err) {
                console.error('Error while retrieving data:', err);
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    // Hàm điều hướng khi click vào tiêu đề chương trình
    const handleProgramClick = (program) => {
        navigate(`/booking/${program.name}`, {
            state: {
                name: program.name,
                description1: program.description1,
                description2: program.description2,
                imageDescription: program.imageDescription,
                price: program.price,
                duration: program.duration
            }
        });  // Điều hướng và truyền toàn bộ dữ liệu
    };

    return (
        <div className="services-program">
            <div className="spa-the-service-section">
                <h2 className="spa-service-title">SWellness & Grooming</h2>
                <img src={Spa} alt="Service Promotion" className="spa-service-image" />
            </div>

            <div className="spa-programs-container">
                <div className="spa-programs-right">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        programs.map((program) => (
                            <div key={program.name} className="spa-program">
                                <h2 
                                    className="program-title" 
                                    onClick={() => handleProgramClick(program)}  // Điều hướng khi click
                                >
                                    {program.name}
                                </h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.descriptionShort}</p>
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
