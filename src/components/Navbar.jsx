import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import "../styles/Navbar.css"; 

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);  
  const [isMenuActive, setIsMenuActive] = useState(false); 
  const location = useLocation(); 

  // Show navbar when mouse moves near it (for large screens)
  const showNavbar = () => {
    if (window.innerWidth > 768) {
      setIsVisible(true);
    }
  };

  // Hide navbar when mouse moves away (for large screens)
  const hideNavbar = () => {
    if (window.innerWidth > 768 && location.pathname !== "/") {
      setIsVisible(false);
    }
  };

  // Handle the toggling of mobile menu
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    // Reset navbar visibility based on page path (only for large screens)
    if (window.innerWidth > 768) {
      if (location.pathname !== "/") {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, [location]);

  return (
    <nav
      className={`navbar ${isVisible ? "visible" : "hidden"}`}
      onMouseEnter={showNavbar}  
      onMouseLeave={hideNavbar}   
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {/* Portfolio */}
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
