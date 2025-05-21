import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import styles from "../../pages/Pages.module.css";
import Reports from "../../pages/reports/Reports";
import About from "../../pages/about/About";
import AuditxToolkit from "../../pages/auditxToolkit/auditxToolkit";
import Login from "../../pages/logIn/LogIn";
import Register from "../../pages/register/Register";
import EditProfile from "../../pages/editProfile/EditProfile";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/my-reports" element={<Reports />} />
        <Route path="/about" element={<About />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/audit-x-toolkit" element={<AuditxToolkit />} />
        <Route path="/profile-edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
