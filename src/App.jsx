import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import Home.jsx
import About from "./pages/About"; // Import About.jsx
import Projects from "./pages/Projects";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/:id" element={<Projects/>} />
      </Routes>
    </Router>
  );
}

export default App;
