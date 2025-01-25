import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import Home.jsx
import About from "./pages/About"; // Import About.jsx
import Projects from "./pages/Projects"; // Import Projects.jsx
import Project1 from "./pages/Project1";
import Project2 from "./pages/Project2";
import Project3 from "./pages/Project3";
import Navbar from "./components/Navbar"; // Import Navbar
import Resume from "./pages/Resume";  

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
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2/>} />
        <Route path="/project3" element={<Project3 />} />
        <Route path="/resume" element={<Resume />} /> 

      </Routes>
    </Router>
  );
}

export default App;
