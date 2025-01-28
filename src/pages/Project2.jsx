import React, { useState, useEffect } from "react";
import { fetchProjects } from "../services/api"; // Import the API function to fetch all projects

const Project2 = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch all projects data
        const projectsData = await fetchProjects(); // Fetch all projects

        // Find the project with ID 2
        const projectData = projectsData.find((p) => p.id === 2); // Find project with ID 2
        setProject(projectData); // Set project data
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData(); // Call the function to fetch data
  }, []);

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

      <section>
        <h2>Project Images</h2>
        {project.image ? (  // Check if image exists in the project data
          <img
            src={`http://localhost:8080/${project.image}`}  // Construct the full image URL
            alt="Project Image"
            className="project-image"
          />
        ) : (
          <p>No image available for this project.</p>
        )}
      </section>
    </div>
  );
};

export default Project2;
