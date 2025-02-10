import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home"; 
import About from "./pages/About"; 
import Projects from "./pages/Projects"; 
import ProjectDetails from "./pages/ProjectDetails"; 
import Navbar from "./components/Navbar";
import Resume from "./pages/Resume"; 
import Login from "./pages/Login";
import Admin from "./pages/Admin"; 

function NavbarWrapper() {
  const location = useLocation();

  
  const isLoginOrAdminPage = location.pathname === '/login' || location.pathname === '/admin';

  return isLoginOrAdminPage ? null : <Navbar />;
}

function App() {
  return (
    <Router>
     
      <NavbarWrapper />
      
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} /> 
        <Route path="/resume" element={<Resume />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
