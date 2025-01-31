import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove authentication flag
    navigate("/login"); // Redirect to login
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Admin Page</h2>
      <button onClick={handleLogout} style={{ padding: "10px", marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};

export default Admin;
