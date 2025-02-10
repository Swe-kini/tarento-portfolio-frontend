import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; 
import { Link } from 'react-router-dom';
import "../styles/Home.css"; 

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile(1)
      .then((data) => {
        
        setUser(data);  
      })
      .catch((error) => {
        
      });
  }, []); 

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

      
        <div className="social-icons">
        <Link to={`${user.github}`} className="social-link">
        <FaGithub />
        </Link>
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

      
      <div className="profile-image">
        <img
          src={`data:image/jpeg;base64,${user.profilePic}`}
          alt="Profile"
          className="profile-img"
        />
      </div>
    </div>
  );
};

export default Home;
