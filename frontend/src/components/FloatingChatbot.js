import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/FloatingChatbot.css";

const FloatingChatbot = () => {
  const location = useLocation();
  const hideOnRoutes = ["/signin", "/signup", "/chatbot"];

  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="floating-chatbot-container">
      <Link to="/chatbot" className="floating-chatbot-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </Link>
    </div>
  );
};

export default FloatingChatbot;
