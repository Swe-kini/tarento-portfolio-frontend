import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import email icon

import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile(1)
      .then((data) => {
        console.log("Fetched data:", data);
        if (data.profile_pic) {
          console.log("Profile Pic URL:", `http://localhost:8080/${data.profile_pic}`);
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
      <div className="profile-container">
        <h1>
          HI <img
            src="https://raw.githubusercontent.com/nixin72/nixin72/master/wave.gif"

            height="40"
            width="40"
          />{" "}
          <br /> I AM {user.name}
          <div className="description-container">
        <p className="description">{user.description}</p>
      </div>
        </h1>
      </div>
      <div className="profile-image">
        <img
          src={`http://localhost:8080${user.profile_pic}`}
          alt="Profile"
          className="profile-img"
        />
        </div>
      {/* Description Section */}
     
      
{/* Social Media Links Section */}

  <div className="social-icons">
    {/* GitHub Link */}
    <a href={`${user.github}`} className="social-link" target="_blank" rel="noopener noreferrer">
      <FaGithub /> {/* GitHub icon */}
    </a>

    {/* LinkedIn Link */}
    <a href={`${user.linkedin}`} className="social-link" target="_blank" rel="noopener noreferrer">
      <FaLinkedin /> {/* LinkedIn icon */}
    </a>

    {/* Email Link */}
    <a href={`mailto:${user.email}`} className="social-link">
      <FaEnvelope /> {/* Email icon */}
    </a>
     
  </div> 
</div>

  );
};

export default Home;
