import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"; // Import email icon

import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile(1)
      .then((data) => {
        console.log("Fetched data:", data);
        if (data.profile_pic) {
          console.log("Profile Pic URL:", `http://localhost:8080${data.profile_pic}`);
        } else {
          console.warn("Profile picture URL is missing in the fetched data.");
        }
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []); // Runs once on mount

  if (!user) return <p>Loading...</p>; // Display loading message

  return (
    <div className="home">
      {/* Profile Section */}
      <div className="profile-container">
        <h1>
          HI <img
            src="https://raw.githubusercontent.com/nixin72/nixin72/master/wave.gif"
            alt="Waving hand animated gif"
            height="40"
            width="40"
          />{" "}
          <br /> I AM {user.name}
        </h1>
        <img
          src={`http://localhost:8080${user.profile_pic}`}
          alt="Profile"
          className="profile-img"
        />
      </div>

      {/* Description Section */}
      <div className="description-container">
        <p className="description">{user.description}</p>
      </div>

      {/* Contact Information Section */}
      <div className="contact-container">
        <p className="contact">
          {user.phone}
        </p>
        
      </div>

      {/* Social Media Links Section */}
      <div className="social-container">
        <div className="social-icons">
          <a href="https://github.com/Swe-kini" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/swetha-benny/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/swe_kini?igsh=cnR6aHc2cWQ0dzFv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a href={`mailto:${user.email}`} className="email-link">
          <FaEnvelope /> {/* Email icon */}
        </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
