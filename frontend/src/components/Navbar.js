import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <header className="navigation-header">
      <nav className="navigation-container">
        <div className="navigation-brand">
          <Link to="/" className="brand-link">
            SkillSphere
          </Link>
        </div>
        <div className="navigation-actions">
          {user ? (
            <>
              <span className="user-greeting">Welcome, {user.name}</span>
              <button onClick={logout} className="auth-button logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="auth-button login-button">
                Login
              </Link>
              <Link to="/signup" className="auth-button signup-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
