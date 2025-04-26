import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../css/FloatingBackButton.css";

const FloatingBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page or if there's no history
  if (location.pathname === "/" || window.history.length <= 1) {
    return null;
  }

  const handleClick = () => {
    navigate(-1); // Go back one page in history
  };

  return (
    <div className="floating-back-container">
      <button
        onClick={handleClick}
        className="floating-back-button"
        aria-label="Go back"
      >
        <FaArrowLeft className="back-icon" />
      </button>
    </div>
  );
};

export default FloatingBackButton;
