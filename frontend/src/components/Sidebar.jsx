import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h3>Resource Manager</h3>
      <nav>
        <ul>
          <li><Link to="/">📊 Dashboard</Link></li>
          
          {/* ✅ Only show Engineers link to admin */}
          {role === "admin" && (
            <li><Link to="/engineers">👩‍💻 Engineers</Link></li>
          )}

          {/* ✅ Both admin and engineer can see these */}
          <li><Link to="/projects">🧱 Projects</Link></li>
          <li><Link to="/assignments">🔗 Assignments</Link></li>

          <li>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
