import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import "../styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("admin");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemData, setNewItemData] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchAllData();
      
    }
  }, [navigate]);

 
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const fetchAllData = async () => {
    try {
      const [skillsRes, projectsRes, educationRes, coursesRes,adminRes] = await Promise.all([
        axios.get("http://localhost:8080/api/skills"),
        axios.get("http://localhost:8080/api/projects"),
        axios.get("http://localhost:8080/api/education"),
        axios.get("http://localhost:8080/api/courses"),
        axios.get("http://localhost:8080/api/admin")
      ]);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
      setEducation(educationRes.data);
      setCourses(coursesRes.data);
      setAdmin(adminRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  const getFieldsForSection = () => {
    switch (activeSection) {
      case "projects":
        return ["title", "description", "details", "explanation","image"];
      case "skills":
        return ["name"];
      case "courses":
        return ["name", "provider"];
      case "admin":
        return ["username", "password"];
      case "education":
        return ["institution", "degree", "year"];
      default:
        return [];
    }
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
      case "admin":
        return admin;
      default:
        return [];
    }
  };

  const handleAdd = () => {
    const fields = getFieldsForSection(activeSection); 
    const newData = Object.fromEntries(fields.map(field => [field, ""]));
  
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
      } else if (activeSection === "skills") {
        const response = await axios.post("http://localhost:8080/api/skills", newItemData);
        setSkills([...skills, response.data]);
      } else if (activeSection === "courses") {
        const response = await axios.post("http://localhost:8080/api/courses", newItemData);
        setCourses([...courses, response.data]);
      } else if (activeSection === "admin") {
        const response = await axios.post("http://localhost:8080/api/admin", newItemData);
        setAdmin([...admin, response.data]);
      }

      
       fetchAllData();
       

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
      } else if (activeSection === "skills") {
        await axios.put(`http://localhost:8080/api/skills/${editData.id}`, editData);
        setSkills(skills.map(item => (item.id === editData.id ? editData : item)));
      } else if (activeSection === "courses") {
        await axios.put(`http://localhost:8080/api/courses/${editData.id}`, editData);
        setCourses(courses.map(item => (item.id === editData.id ? editData : item)));
      } else if (activeSection === "admin") {
        await axios.put(`http://localhost:8080/api/admin/${editData.id}`, editData);
        setAdmin(admin.map(item => (item.id === editData.id ? editData : item)));
      }

      if (newImage) {
        formData.append("image", newImage);
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
      else if (activeSection === "admin") setAdmin(admin.filter((item) => item.id !== id));
      ;
    } catch (error) {
      console.error(`Error deleting ${activeSection} with ID ${id}:`, error);
    }
     
     fetchAllData();
     
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  
  return (
    <div className="admin-container">
     
      <div className={`sidebar ${isMenuActive ? "active" : ""}`}>
        <h2>Admin Dashboard</h2>
        <ul>
          <li className="sidebar-item" onClick={() => setActiveSection("admin")}>Manage Admin</li>
          <li className="sidebar-item" onClick={() => setActiveSection("skills")}>Manage Skills</li>
          <li className="sidebar-item" onClick={() => setActiveSection("education")}>Manage Education</li>
          <li className="sidebar-item" onClick={() => setActiveSection("courses")}>Manage Courses</li>
          <li className="sidebar-item" onClick={() => setActiveSection("projects")}>Manage Projects</li>
        </ul>

        <span className="portfolio-btn" onClick={() => navigate("/")}>Go to Portfolio</span>
        <span className="logout-btn" onClick={handleLogout}>Logout</span>
      </div>

      
      <div className="hamburger-icon" onClick={toggleMenu}>
        &#9776; 
      </div>

      {/* Content Area */}
      <div className="content">
        <h3>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
        <div className="card-container">
          {renderSectionData().map((item) => (
            <div className={`card ${activeSection === "projects" ? "projects-card" : ""}`} key={item.id}>
              <span className={`card-content ${activeSection === "projects" ? "projects-content" : ""}`}>
                {activeSection === "admin" ? (
                  <span className="admin-item">{item.username}</span>
                ) : activeSection === "education" ? (
                  <span className="education-item">{item.institution} - {item.degree}</span>
                ) : activeSection === "projects" ? (
                  <div className="projects-details">
                    <h1 className="projects-title">{item.title}</h1>
                    <div className="projects-explanation" dangerouslySetInnerHTML={{ __html: item.explanation }} />
                    {item.image && (<img src={`data:image/jpeg;base64,${item.image}`} className="projects-image" alt="Project"/>)}
                  </div>
                ) : (
                  <span className="default-item">{item.name || item.title}</span>
                )}
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
          <div className="popup-overlay">
            <div className="popup">
              <h3>Add New {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
              <form onSubmit={handleAddSubmit}>
                {getFieldsForSection().map((field) => (
                  <div key={field}>
                    <input
                      type={field === "password" ? "password" : "text"}
                      value={newItemData[field] || ""}
                      onChange={(e) => setNewItemData({ ...newItemData, [field]: e.target.value })}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  </div>
                ))}

                <button type="submit">Add {activeSection}</button>
                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {showEditForm && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Edit {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
              <form onSubmit={handleEditSubmit}>
                {getFieldsForSection().map((field) => (
                  <div key={field}>
                    <input
                      type={field === "password" ? "password" : "text"}
                      value={editData[field] || ""}
                      onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  </div>
                  
                ))}
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
