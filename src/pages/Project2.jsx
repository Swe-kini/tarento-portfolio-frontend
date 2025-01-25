import React from "react";
import "../styles/Project_details.css";
const Project2 = () => {
  return (
    <div className="project-page">
      <h1>An Indoor Rescue Robot: RescueRoam</h1>
      <p>
        The project introduces “RescueRoam,” an innovative robot designed for Indoor Toxic
        Gas Detection and Human Monitoring. The RescueRoam robot seamlessly integrates
        remote control capabilities with autonomous obstacle avoidance, featuring advanced
        gas sensors for real-time toxic gas detection. With unobtrusive human detection and
        the application of imitation learning, the system ensures efficient navigation in
        indoor spaces affected by toxic gases, while continually refining its skills. Serving
        as a communication relay, RescueRoam facilitates seamless data transmission and
        monitors human vital signs, enhancing overall safety measures. This comprehensive
        solution addresses the critical need for indoor safety, offering a versatile and
        proactive approach to toxic gas detection and human monitoring in affected spaces.
      </p>

      <div className="images-container">
        <img
          src="/robotImage1.jpg"
          alt="RescueRoam Robot"
          className="project-image"
        />
        <img
          src="/robotImage2.jpg"
          className="project-image"
        />
      </div>
    </div>
  );
};

export default Project2;
