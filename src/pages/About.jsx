import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/api";

const About = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile(1) // Fetch user with ID 1
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user profile:", error));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>About Me</h1>
      <p>{user.description}</p>

      <h2>Education</h2>
      <ul>
        {user.educations.map((edu) => (
          <li key={edu.id}>
            {edu.degree} - {edu.institution}
          </li>
        ))}
      </ul>

      <h2>Courses</h2>
      <ul>
        {user.courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>

      <h2>Skills</h2>
      <ul>
        {user.skills.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {user.projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
