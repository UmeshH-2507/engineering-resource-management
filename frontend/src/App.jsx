import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EngineersPage from "./pages/EngineersPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import AssignmentsPage from "./pages/AssignmentsPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleBasedRoute from "./components/RoleBasedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes (All Authenticated Users) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <RoleBasedRoute allowedRoles={["admin", "engineer"]}>
              <ProjectsPage />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <RoleBasedRoute allowedRoles={["admin", "engineer"]}>
              <AssignmentsPage />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/engineers"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <EngineersPage />
            </RoleBasedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
