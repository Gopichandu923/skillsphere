import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/signin">Login</Link>
  </nav>
);

export default Navbar;
