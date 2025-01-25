import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Add custom styles if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          My Portfolio
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li className="navbar-item">
            <Link to="/projects" className="navbar-link">Projects</Link>
          </li>
          <li className="navbar-item">
            <Link to="/resume" className="navbar-link"> Resume</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
