import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import "../styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("skills");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [newData, setNewData] = useState({});

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    } else {
      fetchAllData();
      fetchAdmins();
    }
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const [skillsRes, projectsRes, educationRes, coursesRes] = await Promise.all([
        axios.get("http://localhost:8080/api/skills"),
        axios.get("http://localhost:8080/api/projects"),
        axios.get("http://localhost:8080/api/education"),
        axios.get("http://localhost:8080/api/courses"),
      ]);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
      setEducation(educationRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/app_users");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const handleAdd = async () => {
    const newItem = prompt(`Enter the new ${activeSection} name:`);
    if (!newItem) return;

    const payload =
      activeSection === "skills" || activeSection === "projects"
        ? { name: newItem }
        : { institution: newItem, degree: "New Degree" };

    try {
      const response = await axios.post(`http://localhost:8080/api/${activeSection}`, payload);
      if (response.status === 201) {
        const newData = response.data;
        if (activeSection === "skills") setSkills([...skills, newData]);
        else if (activeSection === "projects") setProjects([...projects, newData]);
        else if (activeSection === "education") setEducation([...education, newData]);
        else if (activeSection === "courses") setCourses([...courses, newData]);
      }
    } catch (error) {
      console.error(`Error adding ${activeSection}:`, error);
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowEditForm(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeSection === "education") {
        await axios.put(`http://localhost:8080/api/education/${editData.id}`, editData);
        setEducation(education.map(item => (item.id === editData.id ? editData : item)));
      } else if (activeSection === "projects") {
        await axios.put(`http://localhost:8080/api/projects/${editData.id}`, editData);
        setProjects(projects.map(item => (item.id === editData.id ? editData : item)));
      }

      setShowEditForm(false);
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${activeSection}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/${activeSection}/${id}`);

      if (activeSection === "skills") setSkills(skills.filter((item) => item.id !== id));
      else if (activeSection === "projects") setProjects(projects.filter((item) => item.id !== id));
      else if (activeSection === "education") setEducation(education.filter((item) => item.id !== id));
      else if (activeSection === "courses") setCourses(courses.filter((item) => item.id !== id));

      console.log(`${activeSection} with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${activeSection} with ID ${id}:`, error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const renderSectionData = () => {
    switch (activeSection) {
      case "skills":
        return skills;
      case "projects":
        return projects;
      case "education":
        return education;
      case "courses":
        return courses;
      case "admins":
        return admins;
      default:
        return [];
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><button onClick={() => setActiveSection("admins")}>Manage Admins</button></li>
          <li><button onClick={() => setActiveSection("skills")}>Manage Skills</button></li>
          <li><button onClick={() => setActiveSection("education")}>Manage Education</button></li>
          <li><button onClick={() => setActiveSection("courses")}>Manage Courses</button></li>
          <li><button onClick={() => setActiveSection("projects")}>Manage Projects</button></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="content">
        {showEditForm && (
          <form onSubmit={handleEditSubmit}>
            <h3>Edit {activeSection.slice(0, -1)}</h3>
            {/* Render relevant fields for Education or Project edit */}
            {activeSection === "education" && (
              <>
                <input
                  type="text"
                  value={editData.institution || ""}
                  onChange={(e) => setEditData({ ...editData, institution: e.target.value })}
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={editData.degree || ""}
                  onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={editData.year || ""}
                  onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                  placeholder="Year"
                />
              </>
            )}
            {activeSection === "projects" && (
              <>
                <input
                  type="text"
                  value={editData.title || ""}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  value={editData.description || ""}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Description"
                />
                <textarea
                  value={editData.details || ""}
                  onChange={(e) => setEditData({ ...editData, details: e.target.value })}
                  placeholder="Details"
                />
                <input
                  type="text"
                  value={editData.images || ""}
                  onChange={(e) => setEditData({ ...editData, images: e.target.value })}
                  placeholder="Images"
                />
                <textarea
                  value={editData.explanation || ""}
                  onChange={(e) => setEditData({ ...editData, explanation: e.target.value })}
                  placeholder="Explanation"
                />
              </>
            )}
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
          </form>
        )}

        <h3>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
        <button className="add-button" onClick={handleAdd}>
          <FaPlus /> Add {activeSection}
        </button>
        <div className="card-container">
          {renderSectionData().map((item) => (
            <div className="card" key={item.id}>
              <span className="card-content">
                {activeSection === "education"
                  ? `${item.institution} - ${item.degree}`
                  : activeSection === "projects"
                  ? item.title
                  : item.name || item.title}
              </span>
              <div className="icons">
                <FaEdit className="edit-icon" onClick={() => handleEdit(item)} />
                <FaTrash className="delete-icon" onClick={() => handleDelete(item.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
