import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";  
import { Link } from "react-router-dom";  // Import Link for navigation

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile(1)  
      .then((data) => {
        console.log("Fetched user data:", data);  // Log the fetched data
        setUser(data);  // Set the user data to state
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);  // This ensures this effect runs only once, on component mount
  
  // Log to see if the state has been updated
  console.log("User state:", user);
  
  
  if (!user) return <p>Loading...</p>;  // Display loading while fetching data

  return (
    <div>
      <h1>Welcome to {user.name}'s Portfolio</h1>
      
      {/* Profile Image */}
      <img src={`http://localhost:8080${user.profilePic}`} alt="Profile" style={{ width: "200px" }} />

      {/* Description */}
      <p>{user.description}</p>

      

      {/* About Me Button */}
      <Link to="/about">About Me</Link>
    </div>
  );
};

export default Home;
