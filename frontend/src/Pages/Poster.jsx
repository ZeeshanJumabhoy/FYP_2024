// ConfirmPoster.js
import React from 'react';
import '../Styles/ConfirmPoster.css'; // Make sure the CSS path is correct

const Poster = ({ onConfirm }) => {
  return (
    <div className="poster-overlay">
      <div className="poster-container">
        <img src="https://www.shutterstock.com/image-vector/blood-donation-illustration-concept-bag-600nw-2156013083.jpg" alt="Confirmation Poster" className="poster-image" />
        <button className="confirm-button" onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Poster;
