import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; 
import "../styles/Home.css"; 

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

  if (!user) return <p>Loading...</p>; 

  return (
    <div className="home">
      <div className="profile-container">
        <h1>
          HI{" "}
          <img
            src="https://raw.githubusercontent.com/nixin72/nixin72/master/wave.gif"
            alt="Wave gif"
            height="50"
            width="50"
          />
          <br /> I AM {user.name}
        </h1>
        <div className="description-container">
          <p className="description">{user.description}</p>
        </div>

        {/* Social Icons Section */}
        <div className="social-icons">
          <a
            href={`${user.github}`}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href={`${user.linkedin}`}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a href={`mailto:${user.email}`} className="social-link">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="profile-image">
        <img
          src={`http://localhost:8080${user.profile_pic}`}
          alt="Profile"
          className="profile-img"
        />
      </div>
    </div>
  );
};

export default Home;
