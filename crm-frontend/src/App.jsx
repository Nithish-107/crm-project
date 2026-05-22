import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Leads from "./pages/Leads";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Meetings from "./pages/Meetings";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import DealDetails from "./pages/DealDetails";

import "./css/responsive.css";
import "./App.css";

function AppContent() {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <>
      {isLoggedIn ? (
        <div className={`app-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
          <Sidebar />

          <div className="main-content">
            <Navbar setSidebarOpen={setSidebarOpen} />

            <div className="page-content">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/customers" element={<Customers />} />

                <Route path="/leads" element={<Leads />} />

                <Route path="/tasks" element={<Tasks />} />

                <Route path="/register" element={<Register />} />

                <Route path="/users" element={<Users />} />

                <Route path="/meetings" element={<Meetings />} />

                <Route path="/contacts" element={<Contacts />} />

                <Route path="/deals" element={<Deals />} />

                <Route path="/deals/:id" element={<DealDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
