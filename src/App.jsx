import React, { useState } from "react";
import "./App.css";
import CodeBlock from "./Components/CodeBlock";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Pricing from "./Pages/Pricing";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import OAuthRedirect from "./Pages/OAuthRedirect";
import ProtectedRoute from "./Components/ProtectedRoute";
import Documentation from "./Pages/Documentation/Documentation";
import Policy from "./Pages/Policy";
const App = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/policy" element={<Policy />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/oauth-redirect" element={<OAuthRedirect />} />
      </Routes>
    </div>
  );
};

export default App;
