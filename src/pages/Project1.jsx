import React from "react";
import "../styles/Project_details.css";
const Project1 = () => {
  return (
    <div className="project-page">
      <h1>A Personal Portfolio Web Page</h1>

      <section>
        <h2>Welcome to my personal portfolio web page!</h2>
        <p>
          This project showcases my skills, projects, and provides a means for visitors to get in touch with me through a contact form.
        </p>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>HTML and CSS Project: This project is built using HTML and CSS, with multiple pages including home, about, contact, skills, and courses.</li>
          <li>Navbar: A navigation bar is included on each page, allowing easy navigation between different sections of the portfolio.</li>
          <li>Home and About Pages: The home page includes introductory text and images, while the about page provides more detailed information about me, including my background, skills, and interests.</li>
          <li>Contact Form: A contact form is available for visitors to reach out to me directly. The form includes fields for name, email, subject, and message, making it easy for visitors to get in touch.</li>
        </ul>
      </section>

      <section>
        <h2>Pages</h2>
        <ul>
          <li><strong>Home:</strong> Introduces visitors to the portfolio and provides a glimpse of my work.</li>
          <li><strong>About:</strong> Offers detailed information about me, including my background, skills, and interests.</li>
          <li><strong>Contact:</strong> Includes a contact form for visitors to send messages directly to me.</li>
          <li><strong>Skills:</strong> Highlights my skills and areas of expertise.</li>
          <li><strong>Courses:</strong> Provides information about relevant courses I have completed or am currently undertaking.</li>
        </ul>
      </section>

      <section>
        <h2>Usage</h2>
        <p>
          Clone this repository to your local machine. Open the <code>index.html</code> file in your web browser to view the portfolio. Navigate between pages using the links in the navigation bar.
        </p>
      </section>

      <section>
        <h2>Feedback</h2>
        <p>
          I welcome any feedback or suggestions you may have! Feel free to reach out to me via the contact form or through my email address listed in the footer of each page.
        </p>
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
