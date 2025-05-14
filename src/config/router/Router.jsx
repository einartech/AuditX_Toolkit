import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import styles from "../../pages/Pages.module.css";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import AuditxToolkit from "../../pages/auditxToolkit/AuditxToolkit";
import Login from "../../pages/logIn/LogIn";
import Register from "../../pages/register/Register";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/audit-x-toolkit" element={<AuditxToolkit />} />
      </Routes>
    </BrowserRouter>
  );
}
