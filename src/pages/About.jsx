// About.jsx
import React, { useEffect, useState } from "react";
import { fetchUserProfile, fetchSkills, fetchEducations, fetchCourses, fetchProjects } from "../services/api";
import "../styles/About.css";  // Import the CSS file

const About = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [educations, setEducations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchUserProfile(1),
      fetchSkills(),
      fetchEducations(),
      fetchCourses(),
      fetchProjects()
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

  // Check if data is still loading or not
  if (!user || skills.length === 0 || educations.length === 0 || courses.length === 0 || projects.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="about">
      <h1 className="about-title">About Me</h1>

      <h2 className="section-title">Education</h2>
      <ul>
        {educations.map((edu) => (
          <li key={edu.id}>{edu.degree} - {edu.institution}</li>
        ))}
      </ul>

      <h2 className="section-title">Courses</h2>
      <ul>
  {courses.map((course) => {
    // Combine non-null values into a single line
    const courseDetails = [
      course.name,
      course.provider,
      course.completionDate
    ]
      .filter((detail) => detail) // Remove null or undefined values
      .join("     ---------") // Join the values with a hyphen

    return <li key={course.id}>{courseDetails}</li>;
  })}
</ul>


      <h2 className="section-title">Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
