import React from "react";
import "../styles/Project_details.css";
const Project3 = () => {
  return (
    <div className="project-page">
      <h1>Project 3: A Field Monitoring and Protection System</h1>
      <p>
        The Crop Protection System project aims to develop an affordable and effective
        solution for detecting and preventing crop damage caused by cows and elephants.
        Leveraging Raspberry Pi 2, the project integrates a PIR sensor, camera module, speaker, 
        and Twilio to detect motion, capture images, play deterrent sounds, and send SMS alerts.
        Using image processing and machine learning algorithms, the system accurately classifies 
        detected objects as cows or elephants. When the animal is identified, a Twilio-powered 
        SMS notification is sent to the farmer, while a deterrent sound is played. This project 
        showcases the potential of Raspberry Pi 2 as a versatile platform for crop protection, 
        enabling farmers to mitigate losses and promote sustainable agriculture practices.
      </p>
    </div>
  );
};

export default Project3;
