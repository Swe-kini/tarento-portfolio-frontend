import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProjects } from "../services/api"; 
import "../styles/ProjectDetails.css"; 

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
    
        const projectsData = await fetchProjects(); 
        const projectData = projectsData.find((p) => p.id === parseInt(projectId)); 
        setProject(projectData); 
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData(); 
  }, [projectId]); 

  if (!project) {
    return <div></div>; 
  }

  return (
    <div className="project-page">
      
      <section>
        <div dangerouslySetInnerHTML={{ __html: project.explanation }} /> 
      </section>

      <section>
        {project.image ? (
          <img
          src={`data:image/jpeg;base64,${project.image}`}
            alt={project.title}
            className="project-image"
          />
        ) : (
          <p></p>
        )}
      </section>

      
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
