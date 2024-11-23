import React from 'react';
import '../Styles/ConfirmPoster.css'; // Make sure the CSS path is correct

const Poster = ({ onConfirm }) => {
  return (
    <div className="poster-overlay">
      <div className="poster-container">
        <img src="uploads/app/Request Poster.png" alt="Confirmation Poster" className="poster-image" />
        <p className="confirmation-text">
          Previously the information I have provided is accurate, and I agree to proceed with the blood donation.
        </p>
        <button className="confirm-button" onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Poster;
