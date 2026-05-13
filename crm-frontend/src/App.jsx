import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div style={{ flex: 1 }}>
            <Navbar />

            <div style={{ padding: "20px" }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/customers" element={<Customers />} />

                {/* <Route
                  path="/leads"
                  element={role === "ADMIN" ? <Leads /> : <Dashboard />}
                /> */}

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
    </BrowserRouter>
  );
}

export default App;
