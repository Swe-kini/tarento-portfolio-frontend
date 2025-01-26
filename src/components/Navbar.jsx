import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for current path
import "../styles/Navbar.css"; // Import custom styles

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);  // Track visibility of the navbar
  const [isMenuActive, setIsMenuActive] = useState(false); // Track visibility of the mobile menu
  const location = useLocation(); // Get current path

  // Show navbar when mouse moves near it
  const showNavbar = () => {
    setIsVisible(true);
  };

  // Hide navbar when mouse moves away
  const hideNavbar = () => {
    if (location.pathname !== "/") {
      setIsVisible(false);
    }
  };

  // Handle the toggling of mobile menu
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    // Reset navbar visibility based on current page path
    if (location.pathname !== "/") {
      setIsVisible(false);  // Hide navbar on all pages except Home
    } else {
      setIsVisible(true);  // Show navbar on the Home page
    }
  }, [location]);

  return (
    <nav
      className={`navbar ${isVisible ? "visible" : "hidden"}`}
      onMouseEnter={showNavbar}  // Show navbar when mouse enters
      onMouseLeave={hideNavbar}   // Hide navbar when mouse leaves
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          My Portfolio
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger-icon" onClick={toggleMenu}>
          &#9776; {/* The hamburger icon */}
        </div>

        {/* Navigation Menu */}
        <ul className={`navbar-menu ${isMenuActive ? "active" : ""}`}>
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
            <Link to="/resume" className="navbar-link">Resume</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
