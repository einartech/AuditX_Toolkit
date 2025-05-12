import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import App from "../../App";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auditxtoolkit" element={<App />} />
        <Route path="/about-the-project" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
