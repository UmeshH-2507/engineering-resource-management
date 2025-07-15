import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api";
import "./AssignmentsPage.css";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    engineer: "",
    project: "",
    hoursPerWeek: "",
    startDate: "",
    endDate: "",
  });

  // 🔐 Auth info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const userEmail = user?.email;

  const fetchData = async () => {
    try {
      const [engRes, projRes, assignRes] = await Promise.all([
        API.get("/engineers"),
        API.get("/projects"),
        API.get("/assignments"),
      ]);

      setEngineers(engRes.data);
      setProjects(projRes.data);

      // 🔍 Filter assignments based on email for engineers
      const allAssignments = assignRes.data;
      const filtered = role === "engineer"
        ? allAssignments.filter((a) => a.engineer?.email === userEmail)
        : allAssignments;

      setAssignments(filtered);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/assignments", form);
      setForm({
        engineer: "",
        project: "",
        hoursPerWeek: "",
        startDate: "",
        endDate: "",
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || "Assignment failed");
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/assignments/${id}`);
    fetchData();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="assignments-page" style={{ marginLeft: "220px", width: "100%" }}>
        <h2>Assignments</h2>

        {/* ✅ Assignment form visible only to admin */}
        {role === "admin" && (
          <form className="assignment-form" onSubmit={handleSubmit}>
            <select name="engineer" value={form.engineer} onChange={handleChange} required>
              <option value="">Select Engineer</option>
              {engineers.map((eng) => (
                <option key={eng._id} value={eng._id}>
                  {eng.name}
                </option>
              ))}
            </select>

            <select name="project" value={form.project} onChange={handleChange} required>
              <option value="">Select Project</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="hoursPerWeek"
              placeholder="Hours/Week"
              value={form.hoursPerWeek}
              onChange={handleChange}
              required
            />

            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
            <button type="submit">Assign</button>
          </form>
        )}

        <table className="assignment-table">
          <thead>
            <tr>
              <th>Engineer</th>
              <th>Project</th>
              <th>Hours/Week</th>
              <th>Duration</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} style={{ textAlign: "center", padding: "20px" }}>
                  No assignments found.
                </td>
              </tr>
            ) : (
              assignments.map((a) => (
                <tr key={a._id}>
                  <td>{a.engineer?.name}</td>
                  <td>{a.project?.name}</td>
                  <td>{a.hoursPerWeek}</td>
                  <td>
                    {a.startDate ? new Date(a.startDate).toLocaleDateString() : "-"} -{" "}
                    {a.endDate ? new Date(a.endDate).toLocaleDateString() : "-"}
                  </td>
                  {role === "admin" && (
                    <td>
                      <button onClick={() => handleDelete(a._id)} className="delete-btn">
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentsPage;
