import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

import API from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [engRes, projRes, assignRes] = await Promise.all([
          API.get("/engineers"),
          API.get("/projects"),
          API.get("/assignments"),
        ]);
        setEngineers(engRes.data);
        setProjects(projRes.data);
        setAssignments(assignRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data");
      }
    };

    fetchData();
  }, []);

  return (
        <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="dashboard-container" style={{ marginLeft: "220px", width: "100%" }}>
        <h2>Welcome, {JSON.parse(localStorage.getItem("user"))?.name}</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Engineers</h3>
          <p>{engineers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Projects</h3>
          <p>{projects.length}</p>
        </div>
        <div className="stat-card">
          <h3>Assignments</h3>
          <p>{assignments.length}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
