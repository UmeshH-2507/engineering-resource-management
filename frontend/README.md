# Engineering Resource Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to manage engineers, projects, and resource assignments within an organization. It supports role-based access for admins and engineers.

---

## 📌 Project Description

This system allows administrators to manage:
- Engineer profiles and skillsets
- Projects with required skills and durations
- Assignments that allocate engineers to projects with specific hours and timelines

Engineers can log in to:
- View their own project assignments and schedules

---

## ✨ Features

### 🔒 Authentication & Roles
- Secure login with JWT tokens
- Role-based routing: `admin` and `engineer`

### 🧑‍💼 Engineer Management (Admin)
- Create, view, and manage engineers
- Add skillsets and availability

### 🧩 Project Management (Admin)
- Create, update, and delete projects
- Assign required skills and project timelines

### 📋 Assignments (Admin)
- Assign engineers to projects
- Specify hours per week and assignment duration
- Remove assignments

### 👨‍🔧 Engineer Dashboard
- View only their own assignments
- No permission to edit or assign

---

## 💻 How to Run Locally

### 🔧 Prerequisites
- Node.js & npm
- MongoDB Atlas or local MongoDB
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/UmeshH-2507/engineering-resource-management.git
cd engineering-resource-management
