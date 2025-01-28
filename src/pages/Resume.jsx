import React from "react";
import { Link } from "react-router-dom";


const Resume = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/about" className="navbar-link">About</Link></li>
          <li><Link to="/projects" className="navbar-link">Projects</Link></li>
        </ul>
      </nav>

      {/* PDF Viewer */}
      <div className="pdf-container">
        <iframe
          src="/resume.pdf"
          title="Resume"
          width="100%"
          height="800px"
         
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Resume;
