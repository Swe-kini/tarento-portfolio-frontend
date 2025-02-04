import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home"; // Import Home.jsx
import About from "./pages/About"; // Import About.jsx
import Projects from "./pages/Projects"; // Import Projects.jsx
import ProjectDetails from "./pages/ProjectDetails"; // Dynamic project details page
import Navbar from "./components/Navbar"; // Import Navbar
import Resume from "./pages/Resume"; 
import Login from "./pages/Login";
import Admin from "./pages/Admin"; 

function NavbarWrapper() {
  const location = useLocation();

  // Don't show Navbar on login and admin pages
  const isLoginOrAdminPage = location.pathname === '/login' || location.pathname === '/admin';

  return !isLoginOrAdminPage ? <Navbar /> : null;
}

function App() {
  return (
    <Router>
      {/* Conditionally render Navbar */}
      <NavbarWrapper />
      
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
