import React, { useState, useEffect } from "react";
import "../styles/Project_details.css"; // Import CSS for styling

const Project3 = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch project data for Project 3 (Replace ID with dynamic value if necessary)
        const projectResponse = await fetch("http://localhost:8080/api/projects/3"); // Fetch project with ID 3
        const projectData = await projectResponse.json();
        setProject(projectData); // Set the project data into the state
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this only runs once

  if (!project) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="project-page">
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <section>
        <h2>Explanation</h2>
        <div dangerouslySetInnerHTML={{ __html: project.explanation }} />
      </section>

      

      
    </div>
  );
};

export default Project3;
