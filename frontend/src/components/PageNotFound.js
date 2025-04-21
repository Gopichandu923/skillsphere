import React from "react";
import { Link } from "react-router-dom";
import "../css/PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <div className="not-found-emoji">🔍</div>
          <div className="not-found-illustration-shadow"></div>
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-message">
          The page you're looking for might have been moved, renamed, or doesn't
          exist anymore. Let's get you back on track.
        </p>
        <Link to="/" className="not-found-link">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
