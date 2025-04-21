import React from "react";
import "../css/LoadSpinner.css";

const LoadingSpinner = ({ size = "medium", color = "primary" }) => {
  const sizeClass = `spinner-${size}`;
  const colorClass = `spinner-${color}`;

  return (
    <div className="spinner-container">
      <div className={`loading-spinner ${sizeClass} ${colorClass}`}></div>
      <p className="loading-text">Loading your content...</p>
    </div>
  );
};

export default LoadingSpinner;
