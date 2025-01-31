import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import Home.jsx
import About from "./pages/About"; // Import About.jsx
import Projects from "./pages/Projects"; // Import Projects.jsx
import ProjectDetails from "./pages/ProjectDetails"; // Dynamic project details page
import Navbar from "./components/Navbar"; // Import Navbar
import Resume from "./pages/Resume"; 
import Login from "./pages/Login";
import Admin from "./pages/Admin"; 

function App() {
  return (
    <Router>
      {/* Navbar is displayed on all pages */}
      <Navbar />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} /> {/* Dynamic project page */}
        <Route path="/resume" element={<Resume />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
