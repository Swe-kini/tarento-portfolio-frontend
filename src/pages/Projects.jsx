// Projects.jsx
import React, { useEffect, useState } from "react";
import { fetchProjects } from "../services/api"; // Import API to fetch projects
import "../styles/Project.css"; // Import CSS for styling

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  if (projects.length === 0) {
    return <p>Loading projects...</p>; // Show loading state
  }

  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
