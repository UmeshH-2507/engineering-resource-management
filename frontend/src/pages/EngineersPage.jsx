import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

import API from "../services/api";
import "./EngineersPage.css";

const EngineersPage = () => {
  const [engineers, setEngineers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", skills: "", availableHours: 40 });
  const [editingId, setEditingId] = useState(null);

  const fetchEngineers = async () => {
    const res = await API.get("/engineers");
    setEngineers(res.data);
  };

  useEffect(() => {
    fetchEngineers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, skills: form.skills.split(",").map(s => s.trim()) };
    if (editingId) {
      await API.put(`/engineers/${editingId}`, payload);
    } else {
      await API.post("/engineers", payload);
    }
    setForm({ name: "", email: "", skills: "", availableHours: 40 });
    setEditingId(null);
    fetchEngineers();
  };

  const handleEdit = (engineer) => {
    setForm({
      name: engineer.name,
      email: engineer.email,
      skills: engineer.skills.join(", "),
      availableHours: engineer.availableHours,
    });
    setEditingId(engineer._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/engineers/${id}`);
    fetchEngineers();
  };

  return (
   <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="engineers-page" style={{ marginLeft: "220px", width: "100%" }}>
        <h2>Engineers</h2>

      <form className="engineer-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" />
        <input
          type="number"
          name="availableHours"
          value={form.availableHours}
          onChange={handleChange}
          placeholder="Available Hours"
        />
        <button type="submit">{editingId ? "Update" : "Add"} Engineer</button>
      </form>

      <table className="engineer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Available Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {engineers.map((eng) => (
            <tr key={eng._id}>
              <td>{eng.name}</td>
              <td>{eng.email}</td>
              <td>{eng.skills.join(", ")}</td>
              <td>{eng.availableHours}</td>
              <td>
                <button onClick={() => handleEdit(eng)}>Edit</button>
                <button onClick={() => handleDelete(eng._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default EngineersPage;
