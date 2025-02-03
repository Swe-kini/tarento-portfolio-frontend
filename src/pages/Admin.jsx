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
  const [editAdmin, setEditAdmin] = useState({ id: "", username: "", password: "" });
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });

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

  const handleAddAdmin = async () => {
    if (!newAdmin.username || !newAdmin.password) {
      alert("Username and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/admin/app_users", newAdmin);
      setAdmins([...admins, response.data]);
      setNewAdmin({ username: "", password: "" });
    } catch (error) {
      console.error("Error adding new admin:", error);
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

  const handleEdit = async (id, currentData) => {
    const updatedValue = prompt(`Edit ${activeSection}:`, currentData);
    if (!updatedValue) return;

    const payload =
      activeSection === "skills" || activeSection === "projects"
        ? { name: updatedValue }
        : { institution: updatedValue, degree: "Updated Degree" };

    try {
      await axios.put(`http://localhost:8080/api/${activeSection}/${id}`, payload);

      // Update UI instantly
      if (activeSection === "skills") {
        setSkills(skills.map(item => item.id === id ? { ...item, name: updatedValue } : item));
      } else if (activeSection === "projects") {
        setProjects(projects.map(item => item.id === id ? { ...item, name: updatedValue } : item));
      } else if (activeSection === "education") {
        setEducation(education.map(item => item.id === id ? { ...item, institution: updatedValue } : item));
      } else if (activeSection === "courses") {
        setCourses(courses.map(item => item.id === id ? { ...item, institution: updatedValue } : item));
      }
    } catch (error) {
      console.error(`Error updating ${activeSection}:`, error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/admin/app_users/${id}`);

      // Remove the deleted admin from the state
      setAdmins(admins.filter((admin) => admin.id !== id));
      console.log(`Admin with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting admin with ID ${id}:`, error);
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

  const handleAdminEditClick = (admin) => {
    setEditAdmin(admin);
    setShowEditForm(true);
  };

  const handleAdminEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/admin/app_users/${editAdmin.id}`, editAdmin);
      setShowEditForm(false);
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Error updating admin:", error);
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
        {activeSection === "admins" && (
          <>
            <h3>Manage Admins</h3>
            {showEditForm && (
              <form onSubmit={handleAdminEditSubmit}>
                <input
                  type="text"
                  value={editAdmin.username}
                  onChange={(e) => setEditAdmin({ ...editAdmin, username: e.target.value })}
                  placeholder="Username"
                  required
                />
                <input
                  type="password"
                  value={editAdmin.password}
                  onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
                  placeholder="New Password (optional)"
                />
                <button type="submit">Update Admin</button>
                <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
              </form>
            )}

            <form onSubmit={handleAddAdmin}>
              <input
                type="text"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                placeholder="New Admin Username"
                required
              />
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                placeholder="New Admin Password"
                required
              />
              <button type="submit">Add Admin</button>
            </form>

            <ul>
              {admins.map((admin) => (
                <li key={admin.id}>
                  {admin.username}
                  <FaEdit className="edit-icon" onClick={() => handleAdminEditClick(admin)} />
                  <FaTrash className="delete-icon" onClick={() => handleDeleteAdmin(admin.id)} />
                </li>
              ))}
            </ul>
          </>
        )}
        {activeSection !== "admins" && (
          <>
            <h3>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h3>
            <button className="add-button" onClick={handleAdd}>
              <FaPlus /> Add {activeSection}
            </button>
            <Section title={activeSection} data={renderSectionData()} type={activeSection} onDelete={handleDelete} onEdit={handleEdit} />
          </>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, data, type, onDelete, onEdit }) => {
  return (
    <div>
      <div className="card-container">
        {data.length > 0 ? (
          data.map((item) => (
            <div className="card" key={item.id}>
              <span className="card-content">
                {type === "education" || type === "courses"
                  ? `${item.institution} - ${item.degree}`
                  : item.name || item.title}
              </span>
              <div className="icons">
                <FaEdit className="edit-icon" onClick={() => onEdit(item.id, item.name || item.institution)} />
                <FaTrash className="delete-icon" onClick={() => onDelete(item.id)} />
              </div>
            </div>
          ))
        ) : (
          <p>No {title} found</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
