import React from 'react';
import '../../styles/dashboard/listGiftCards.css';

const giftCards = [
  { description: "Body Care", discount: "10%", startDate: "20/11/2024", endDate: "01/12/2024" },
  { description: "Massage", discount: "15%", startDate: "20/11/2024", endDate: "01/12/2024" },
  { description: "Basic SPA", discount: "15%", startDate: "20/11/2024", endDate: "01/12/2024" },
  { description: "Facial Massage", discount: "10%", startDate: "20/11/2024", endDate: "01/12/2024" },
  { description: "Face Care", discount: "10%", startDate: "20/11/2024", endDate: "01/12/2024" },
  { description: "Oil Wrap", discount: "15%", startDate: "20/11/2024", endDate: "01/12/2024" },
];

const GiftCardsList = () => {
  return (
    <div className="gift-cards-container">
      <header className="gift-cards-header">
        <h2>List Gift Cards</h2>
        <div className="gift-cards-actions">
          <button className="filter-button">
            <i className="icon-filter"></i> Filter
          </button>
          <button className="add-button">
            <i className="icon-add"></i> + Add
          </button>
        </div>
      </header>
      <table className="gift-cards-table">
        <thead>
          <tr>
            <th>Services</th>
            <th>Discount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {giftCards.map((card, index) => (
            <tr key={index}>
              <td>{card.description}</td>
              <td>{card.discount}</td>
              <td className="red-text">{card.startDate}</td>
              <td className="red-text">{card.endDate}</td>
              <td className="actions">
                <button className="action-button edit-button">✏️</button>
                <button className="action-button delete-button">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GiftCardsList;
