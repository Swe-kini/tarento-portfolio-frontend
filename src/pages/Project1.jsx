import React, { useState, useEffect } from "react";
import "../styles/Project_details.css";

const Project1 = () => {
  const [project, setProject] = useState(null);
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch project data
        const projectResponse = await fetch("http://localhost:8080/api/projects/1"); // Replace with dynamic project ID
        const projectData = await projectResponse.json();
        setProject(projectData);

        // Fetch explanation data
        const explanationResponse = await fetch("http://localhost:8080/api/explanations/1"); // Replace with dynamic project ID
        const explanationData = await explanationResponse.json();
        setExplanation(explanationData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, []);

  if (!project) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="project-page">
      {/* <h1>{project.description}</h1> */}

      <section>
      
        <div dangerouslySetInnerHTML={{ __html: project.explanation }} />
      </section>

      <section>
        <a
          href="https://github.com/Swe-kini/html-css-task-1/tree/main/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project on GitHub
        </a>
      </section>
    </div>
  );
};

export default Project1;
