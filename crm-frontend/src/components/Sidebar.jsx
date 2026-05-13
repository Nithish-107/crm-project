import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  CheckSquare,
  Calendar,
  Contact,
  ShieldCheck,
  Handshake,
} from "lucide-react";

import "../css/Sidebar.css";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>TechNext</h1>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">MAIN</p>

        <Link to="/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">SALES</p>

        {role === "ADMIN" && (
          <>
            <Link to="/customers">
              <Users size={18} />
              Customers
            </Link>

            <Link to="/leads">
              <UserPlus size={18} />
              Leads
            </Link>

            <Link to="/contacts">
              <Contact size={18} />
              Contacts
            </Link>

            <Link to="/tasks">
              <CheckSquare size={18} />
              Tasks
            </Link>

            <Link to="/meetings">
              <Calendar size={18} />
              Meetings
            </Link>

            <Link to="/users">
              <ShieldCheck size={18} />
              Manage Users
            </Link>
            <Link to="/deals">
              <Handshake size={18} />
              Deals
            </Link>
          </>
        )}

        {role === "USER" && (
          <>
            <Link to="/leads">
              <UserPlus size={18} />
              My Leads
            </Link>
            <Link to="/tasks">
              <CheckSquare size={18} />
              Tasks
            </Link>

            <Link to="/meetings">
              <Calendar size={18} />
              Meetings
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
