import React from "react";
import { Link } from "react-router-dom";
import "../css/PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="not-found-link">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
