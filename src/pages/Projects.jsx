import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <ul className="projects-list">
        {projects.map((project, index) => (
          <li key={project.id} className="project-card">
            {/* Make the entire card clickable */}
            <Link
              to={`/project${index + 1}`}
              className="project-link"
            >
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
