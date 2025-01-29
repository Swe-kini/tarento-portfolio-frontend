import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProjects } from "../services/api"; // Import API function to fetch projects
import "../styles/ProjectDetails.css"; // Import your CSS

const ProjectDetails = () => {
  const { projectId } = useParams(); // Get projectId from the URL parameter
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch all projects data
        const projectsData = await fetchProjects(); // Fetch all projects

        // Find the project based on the ID from the URL
        const projectData = projectsData.find((p) => p.id === parseInt(projectId)); // Find the project by ID
        setProject(projectData); // Set project data
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData(); // Call the function to fetch data
  }, [projectId]); // Refetch the project when the ID changes

  if (!project) {
    return <div></div>; // Show loading message while data is being fetched
  }

  return (
    <div className="project-page">
      
      <section>
        <div dangerouslySetInnerHTML={{ __html: project.explanation }} /> {/* Render explanation */}
      </section>

      <section>
        {project.image ? (
          <img
            src={`http://localhost:8080/${project.image}`} // Display project image
            alt={project.title}
            className="project-image"
          />
        ) : (
          <p></p>
        )}
      </section>

      
  {/* Conditionally render GitHub link only if it's provided in the database */}
  {project.link && project.link.trim() !== "" && (
    <section>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project on GitHub
      </a>
    </section>
  )}
    </div>
  );
};

export default ProjectDetails;
