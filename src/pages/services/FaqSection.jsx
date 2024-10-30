import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './FaqSection.css';

const FaqSection = () => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (index) => {
        setExpandedItems((prevItems) => ({
            ...prevItems,
            [index]: !prevItems[index],
        }));
    };

    return (
        <div className="faq-section">
            <h2>Relax, Enjoy and Love Yourself</h2>
            <div className="faq-item">
                <div className="faq-header">
                    <h3>What is Hydrafacial?</h3>
                    <button onClick={() => toggleExpand(0)} className="toggle-button">
                        <FontAwesomeIcon icon={expandedItems[0] ? faMinus : faPlus} />
                    </button>
                </div>
                {expandedItems[0] && (
                    <>
                        <p>
                            The HydraFacial is a much-loved rejuvenation treatment, using patented Vortex technology to deliver botanical nutrients directly to the skin. HydraFacials infuse skin with healthy doses of hyaluronic acid, red algae extract, copper, zinc, and magnesium peptides to plump and rejuvenate your appearance, and leave you glowing from the inside out.
                        </p>
                        <p>
                            HydraFacials are a miracle treatment for common skin concerns such as: acne, hyperpigmentation, fine lines, wrinkles, dryness, redness, inflammation, age spots and can even general dullness. If you are looking to replenish the building blocks which lead to long-lasting, healthy-looking skin then a HydraFacial could be exactly the ticket.
                        </p>
                    </>
                )}
            </div>
            <div className="faq-item">
                <div className="faq-header">
                    <h3>Should I wash my hair before doing a haircut?</h3>
                    <button onClick={() => toggleExpand(1)} className="toggle-button">
                        <FontAwesomeIcon icon={expandedItems[1] ? faMinus : faPlus} />
                    </button>
                </div>
                {expandedItems[1] && <p>It is generally recommended to wash your hair before a haircut...</p>}
            </div>
            <div className="faq-item">
                <div className="faq-header">
                    <h3>What does Cocktail makeup include?</h3>
                    <button onClick={() => toggleExpand(2)} className="toggle-button">
                        <FontAwesomeIcon icon={expandedItems[2] ? faMinus : faPlus} />
                    </button>
                </div>
                {expandedItems[2] && <p>Cocktail makeup includes bold eyes and defined lips...</p>}
            </div>
        </div>
    );
};

export default FaqSection;
