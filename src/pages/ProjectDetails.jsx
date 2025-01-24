import React, { useEffect, useState } from "react";
import { fetchProjectDetails } from "../services/api";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProjectDetails(id)
      .then((data) => setProject(data))
      .catch((error) => console.error("Error fetching project details:", error));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
