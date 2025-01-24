import React, { useEffect, useState } from "react";
import { fetchUserProfile, fetchSkills, fetchEducations, fetchCourses, fetchProjects } from "../services/api";

const About = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [educations, setEducations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const userId = 1; // Assuming we're using the same user ID for all data

    // Fetch all data concurrently
    Promise.all([
      fetchUserProfile(userId),
      fetchSkills(userId),
      fetchEducations(userId),
      fetchCourses(userId),
      fetchProjects(userId)
    ])
      .then(([userData, skillsData, educationsData, coursesData, projectsData]) => {
        setUser(userData);
        setSkills(skillsData);
        setEducations(educationsData);
        setCourses(coursesData);
        setProjects(projectsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!user || !skills || !educations || !courses || !projects) return <p>Loading...</p>;

  return (
    <div>
      <h1>About Me</h1>
      <p>{user.description}</p>

      <h2>Education</h2>
      <ul>
        {educations.map((edu) => (
          <li key={edu.id}>{edu.degree} - {edu.institution}</li>
        ))}
      </ul>

      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>

      <h2>Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
