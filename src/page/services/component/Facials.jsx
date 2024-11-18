import React, { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
=======
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
import '../../../styles/services/component/Facials.css';
import Book from '../../../page/services/component/Book';
import FaqSection from '../../../page/services/component/FaqSection';
import Faci from '../../../images/facialTreatment.png';
import Cop from '../../../images/cop.png';
import Dogu from '../../../images/dogu.png';
import Facial from '../../../images/facial.png';

<<<<<<< HEAD
const Facials = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
=======
const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const Facials = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Thêm state để xử lý lỗi
    const navigate = useNavigate();  // Khởi tạo useNavigate
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('http://localhost:5000/api/facial-programs');
                setPrograms(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error while retrieving data:', error);
=======
                
                const response = await axios.get(`${API_HOST}/v1/services/category/2`);

                // Lọc và xử lý dữ liệu trả về với đầy đủ thông tin
                const filteredPrograms = response.data.data.map((program) => ({
                    name: program.name,
                    price: program.price,
                    descriptionShort: program.descriptionShort,
                    description1: program.description1, 
                    description2: program.description2,
                    imageDescription: program.imageDescription, 
                    duration: program.duration, 
                }));

                setPrograms(filteredPrograms);
                setLoading(false);
            } catch (error) {
                console.error('Error while retrieving data:', error);
                setError('Failed to load programs. Please try again later.');
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
                setLoading(false);
            }
        };

        fetchPrograms();
<<<<<<< HEAD
    }, []);
=======
    }, []);  // Chạy lần đầu khi component mount

    const handleProgramClick = (program) => {
        // Điều hướng tới trang booking với tất cả các thông tin chi tiết
        navigate(`/booking/${program.name}`, {
            state: {
                name: program.name,
                description1: program.description1,
                description2: program.description2,
                imageDescription: program.imageDescription,
                price: program.price,
                duration: program.duration,
            }
        });
    };
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b

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
<<<<<<< HEAD
                    ) : (
                        programs.map((program, index) => (
                            <div className="facial-program" key={index}>
                                <h2 className="program-title">{program.title}</h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.description}</p>
=======
                    ) : error ? (
                        <p className="error-message">{error}</p>  // Hiển thị thông báo lỗi nếu có
                    ) : (
                        programs.map((program) => (
                            <div className="facial-program" key={program.name}>
                                <h2 
                                    className="program-title" 
                                    onClick={() => handleProgramClick(program)}  // Chuyển toàn bộ đối tượng program
                                >
                                    {program.name}
                                </h2>
                                <span className="program-price">{program.price}$</span>
                                <p className="program-description">{program.descriptionShort}</p>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
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
<<<<<<< HEAD

=======
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
            <Book />
        </div>
    );
};

<<<<<<< HEAD
export default Facials;
=======
export default Facials;
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
