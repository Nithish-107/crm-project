import { useEffect, useState } from "react";
import axios from "axios";
import DashboardChart from "../components/DashboardChart";

import "../css/Dashboard.css";

function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);

  const [leadCount, setLeadCount] = useState(0);

  const [taskCount, setTaskCount] = useState(0);

  const [convertedCount, setConvertedCount] = useState(0);

  const [pendingTasks, setPendingTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await fetchDashboardData();
    };

    loadData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const customerResponse = await axios.get(
        "https://crm-project-kizo.onrender.com/customers/count",
      );

      setCustomerCount(customerResponse.data);

      const leadResponse = await axios.get("https://crm-project-kizo.onrender.com/leads/count");

      setLeadCount(leadResponse.data);

      const taskResponse = await axios.get("https://crm-project-kizo.onrender.com/tasks/count");

      setTaskCount(taskResponse.data);

      const convertedResponse = await axios.get(
        "https://crm-project-kizo.onrender.com/leads/converted/count",
      );

      setConvertedCount(convertedResponse.data);

      const pendingResponse = await axios.get(
        "https://crm-project-kizo.onrender.com/tasks/pending/count",
      );

      setPendingTasks(pendingResponse.data);

      const overdueResponse = await axios.get(
        "https://crm-project-kizo.onrender.com/tasks/overdue/count",
      );
      setOverdueTasks(overdueResponse.data);

      const userResponse = await axios.get("https://crm-project-kizo.onrender.com/users/count");

      setUserCount(userResponse.data);

      try {
        const activityResponse = await axios.get(
          "https://crm-project-kizo.onrender.com/activities",
        );

        console.log("Activities:", activityResponse.data);

        setActivities(activityResponse.data);
      } catch (error) {
        console.log("Activity Error:", error);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };
  console.log("STATE:", activities);
  return (
    <div className="dashboard">
      <h1 className="welcome-text">Welcome {localStorage.getItem("userName")}</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h2>Customers</h2>
          <h1>{customerCount}</h1>
        </div>

        <div className="card">
          <h2>Leads</h2>
          <h1>{leadCount}</h1>
        </div>

        <div className="card">
          <h2>Tasks</h2>
          <h1>{taskCount}</h1>
        </div>

        <div className="card">
          <h2>Converted</h2>
          <h1>{convertedCount}</h1>
        </div>

        <div className="card">
          <h2>Users</h2>
          <h1>{userCount}</h1>
        </div>
      </div>

      <div className="notification-box">
        <h2>Notifications</h2>

        <p>
          🚨 Overdue Tasks:
          <strong> {overdueTasks}</strong>
        </p>

        <p>
          ⚠ Pending Tasks:
          <strong> {pendingTasks}</strong>
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-box">
          <h2>Recent Activities</h2>

          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <p>• {activity.message}</p>

              <small>{activity.createdAt}</small>
            </div>
          ))}
        </div>

        <div className="dashboard-box">
          <h2>CRM Analytics</h2>

          <DashboardChart
            customerCount={customerCount}
            leadCount={leadCount}
            taskCount={taskCount}
            convertedCount={convertedCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
