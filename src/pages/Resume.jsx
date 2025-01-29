import React from "react";
import { Link } from "react-router-dom";

const Resume = () => {
  return (
    <div>
      {/* Navbar */}
      <nav 
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "flex-end", // Align items to the right
          alignItems: "center",
          backgroundColor: "#efecf1",
          padding: "10px",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "1000",
        }}
      >
        <ul 
          className="navbar-menu"
          style={{
            display: "flex",
            gap: "20px",
            margin: "0",
            padding: "0",
            listStyle: "none",
          }}
        >
          <li><Link to="/" className="navbar-link" style={{ color: "#670b74", textDecoration: "none", fontSize: "1.1rem", padding: "10px 20px" }}>Home</Link></li>
          <li><Link to="/about" className="navbar-link" style={{ color: "#670b74", textDecoration: "none", fontSize: "1.1rem", padding: "10px 20px" }}>About</Link></li>
          <li><Link to="/projects" className="navbar-link" style={{ color: "#670b74", textDecoration: "none", fontSize: "1.1rem", padding: "10px 20px" }}>Projects</Link></li>
        </ul>
      </nav>

      {/* PDF Viewer */}
      <div className="pdf-container" style={{ paddingTop: "70px" }}> {/* Ensure space for navbar */}
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
