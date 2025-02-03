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
  const [newAdminData, setNewAdminData] = useState({ username: "", password: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemData, setNewItemData] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
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

  const handleAdd = () => {
    const fields = activeSection === "projects"
      ? ["title", "description", "details", "images", "explanation"]
      : ["institution", "degree", "year"];
    
    const newData = {};
    fields.forEach(field => {
      newData[field] = "";
    });

    setNewItemData(newData);
    setShowAddForm(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeSection === "projects") {
        const response = await axios.post("http://localhost:8080/api/projects", newItemData);
        setProjects([...projects, response.data]);
      } else if (activeSection === "education") {
        const response = await axios.post("http://localhost:8080/api/education", newItemData);
        setEducation([...education, response.data]);
      }
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding item:", error);
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

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li className="sidebar-item" onClick={() => setActiveSection("admins")}>Manage Admin</li>
          <li className="sidebar-item" onClick={() => setActiveSection("skills")}>Manage Skills</li>
          <li className="sidebar-item" onClick={() => setActiveSection("education")}>Manage Education</li>
          <li className="sidebar-item" onClick={() => setActiveSection("courses")}>Manage Courses</li>
          <li className="sidebar-item" onClick={() => setActiveSection("projects")}>Manage Projects</li>
        </ul>
        <span className="logout-btn" onClick={handleLogout}>Logout</span>
      </div>

      <div className="content">
        <h3>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>

        <div className="card-container">
          {renderSectionData().map((item) => (
            <div className="card" key={item.id}>
              <span className="card-content">
                {activeSection === "admins" 
                  ? `${item.username}` 
                  : activeSection === "education"
                  ? `${item.institution} - ${item.degree}`
                  : activeSection === "projects"
                  ? (
                      <>
                        <h4>{item.title}</h4>
                        <p>{expanded[item.id] ? item.description : item.description.slice(0, 100)}</p>
                        {item.description.length > 100 && (
                          <button className="read-more-btn" onClick={() => toggleExpanded(item.id)}>
                            {expanded[item.id] ? "Read Less" : "Read More"}
                          </button>
                        )}
                        <p>{item.details}</p>
                        <div
                          className="explanation"
                          dangerouslySetInnerHTML={{ __html: item.explanation }}
                        />
                      </>
                    )
                  : item.name || item.title}
              </span>
              <div className="icons">
                <FaEdit className="edit-icon" onClick={() => handleEdit(item)} />
                <FaTrash className="delete-icon" onClick={() => handleDelete(item.id)} />
              </div>
            </div>
          ))}
        </div>

        <span className="add-button" onClick={handleAdd}>
          <FaPlus /> Add {activeSection}
        </span>

        {showAddForm && (
          <form onSubmit={handleAddSubmit}>
            <h3>Add New {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
            {Object.keys(newItemData).map((key) => (
              <input
                key={key}
                type="text"
                value={newItemData[key] || ""}
                onChange={(e) => setNewItemData({ ...newItemData, [key]: e.target.value })}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
            <button type="submit">Add {activeSection}</button>
            <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        )}

        {showEditForm && (
          <form onSubmit={handleEditSubmit}>
            <h3>Edit {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
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
      </div>
    </div>
  );
};

export default Admin;
