import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    requiredSkills: "",
    startDate: "",
    endDate: "",
  });
  const [editingId, setEditingId] = useState(null);

  // 🔐 Get user role
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      requiredSkills: form.requiredSkills.split(",").map((s) => s.trim()),
    };
    if (editingId) {
      await API.put(`/projects/${editingId}`, payload);
    } else {
      await API.post("/projects", payload);
    }
    setForm({
      name: "",
      description: "",
      requiredSkills: "",
      startDate: "",
      endDate: "",
    });
    setEditingId(null);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setForm({
      name: project.name,
      description: project.description,
      requiredSkills: project.requiredSkills.join(", "),
      startDate: project.startDate?.substring(0, 10),
      endDate: project.endDate?.substring(0, 10),
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="projects-page" style={{ marginLeft: "220px", width: "100%" }}>
        <h2>Projects</h2>

        {/* ✅ Only show form if user is admin */}
        {role === "admin" && (
          <form className="project-form" onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Project Name"
              required
            />
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              name="requiredSkills"
              value={form.requiredSkills}
              onChange={handleChange}
              placeholder="Skills (comma-separated)"
            />
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
            <button type="submit">
              {editingId ? "Update" : "Create"} Project
            </button>
          </form>
        )}

        <table className="project-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Skills</th>
              <th>Duration</th>
              {/* ✅ Show Actions column only for admin */}
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.requiredSkills.join(", ")}</td>
                <td>
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
                {/* ✅ Show Edit/Delete only for admin */}
                {role === "admin" && (
                  <td>
                    <button onClick={() => handleEdit(project)}>Edit</button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsPage;
