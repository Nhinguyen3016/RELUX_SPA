import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/aboutpage/AboutPage.css';
import avaterCEO from '../../images/avatarCEO.jpg';
import about1 from '../../images/about1.jpg';
import about2 from '../../images/about2.jpg';
import backgroundAbout from '../../images/backgroundAbout.jpg';

const MissionPage = () => {
    const navigate = useNavigate(); // Khởi tạo useNavigate

    // Hàm điều hướng khi nhấn nút
    const handleNavigate = () => {
        navigate('/services'); // Điều hướng đến trang /services
    };

    return (
        <>
            {/* Header Section */}
            <div
                className="header-section-about"
                style={{
                    backgroundImage: `url(${backgroundAbout})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                }}
            >
                <h1 className="title-about">Our Mission</h1>
            </div>

            <div className="container-about">
                {/* Mission Content Section */}
                <section className="mission-content-about">
                    <div className="mission-column-about">
                        <p className="mission-text-about">
                            We heal you with love, peace respects each
                            spirit and all the messages within us.
                        </p>
                        <div className="profile-about">
                            <div className="profile-image-about">
                                <img src={avaterCEO} alt="CEO Profile" />
                            </div>
                            <div className="profile-details-about">
                                <span className="profile-name-about">Susan Baker</span>
                                <span className="profile-position-about">CEO Spa</span>
                            </div>
                        </div>
                    </div>

                    <div className="mission-column-about">
                        <p className="description-about">
                            For your convenience, there are times that all different therapists through their own great philosophy, ready to make you feel more healthy.
                        </p>
                        <p className="description-about">
                            If you're yet excited to talk to us or visit us, there's no pressure since
                            we will wait until you're ready. Take your time to know more about us.
                        </p>
                        <button className="btn-about" onClick={handleNavigate}>
                            Our Services
                        </button>
                    </div>
                </section>
                <hr className="styled-hr" />

                {/* Gallery Section */}
                <section className="gallery-section-about">
                    <div className="gallery-grid-about">
                        <div className="gallery-item-about">
                            <img src={about2} alt="Relaxation Service" />
                        </div>
                        <div className="gallery-item-aboutt">
                            <img src={about1} alt="Organic Products" />
                            <p className="gallery-caption-about">
                                "All cosmetics, hair products, and organics. This majority of oil has studied to natural."
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Services Section - Outside container */}
            <section className="services-section-about">
                <h2 className="services-title-about">Relax, Enjoy and Love Yourself</h2>

                <div className="services-grid-about">
                    {services.map((service, index) => (
                        <div key={index} className="service-card-about">
                            <div className="service-icon-about">{service.icon}</div>
                            <h3 className="service-title-about">{service.title}</h3>
                            <p className="service-description-about">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

const services = [
    {
        icon: "\uD83C\uDF3F",
        title: "Professional Experience",
        description: "Our team brings years of expertise to deliver exceptional results.",
    },
    {
        icon: "\u2728",
        title: "Natural Harmony",
        description: "We blend modern techniques with natural approaches.",
    },
    {
        icon: "\uD83D\uDC86\u200D♀️",
        title: "Deep Healing",
        description: "Experience profound relaxation and healing benefits.",
    },
    {
        icon: "\uD83C\uDF43",
        title: "True Comfort",
        description: "Your comfort and peace of mind are our top priorities.",
    },
];

export default MissionPage;
