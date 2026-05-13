import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const role = localStorage.getItem("role");
  const [editingId, setEditingId] = useState(null);
  const [users, setUsers] = useState([]);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/tasks");

    if (role === "ADMIN") {
      setTasks(response.data);
    } else {
      const filteredTasks = response.data.filter(
        (task) => task.assignedTo === userName,
      );

      setTasks(filteredTasks);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    priority: "Medium",
    assignedTo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.dueDate) {
      alert("All fields required");

      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8080/tasks/${editingId}`,

          formData,
        );

    

        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:8080/tasks",

          formData,
        );

        
      }

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
        priority: "Medium",
        assignedTo: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);


      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task) => {
    setEditingId(task.id);

    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo,
    });
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/tasks/${id}/status?status=${status}`,
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tasks-container">
      <h1>{role === "ADMIN" ? "Tasks" : "My Tasks"}</h1>

      {role === "ADMIN" && (
        <form className="task-form" onSubmit={addTask}>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
          >
            <option value="">Assign User</option>

            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>

            <option value="Medium">Medium</option>

            <option value="Low">Low</option>
          </select>

          <button type="submit">Add Task</button>
        </form>
      )}

      <br />

      <div className="kanban-board">

        <div className="kanban-column">
          <h2>Pending</h2>

          {tasks
            .filter((task) => task.status === "Pending")
            .map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <small>📅 {task.dueDate}</small>

                <br />

                <small>👤 {task.assignedTo}</small>

                <p
                  className={
                    task.priority === "High"
                      ? "priority-high"
                      : task.priority === "Medium"
                        ? "priority-medium"
                        : "priority-low"
                  }
                >
                  {task.priority}
                </p>

                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>

                  <option value="In Progress">In Progress</option>

                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
        </div>

        <div className="kanban-column">
          <h2>In Progress</h2>

          {tasks
            .filter(
              (task) =>
                task.status === "In Progress" || task.status === "InProgress",
            )
            .map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <small>📅 {task.dueDate}</small>

                <br />

                <small>👤 {task.assignedTo}</small>

                <p
                  className={
                    task.priority === "High"
                      ? "priority-high"
                      : task.priority === "Medium"
                        ? "priority-medium"
                        : "priority-low"
                  }
                >
                  {task.priority}
                </p>

                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>

                  <option value="In Progress">In Progress</option>

                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
        </div>

        {/* Completed */}

        <div className="kanban-column">
          <h2>Completed</h2>

          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <small>📅 {task.dueDate}</small>

                <br />

                <small>👤 {task.assignedTo}</small>

                <p
                  className={
                    task.priority === "High"
                      ? "priority-high"
                      : task.priority === "Medium"
                        ? "priority-medium"
                        : "priority-low"
                  }
                >
                  {task.priority}
                </p>

                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>

                  <option value="In Progress">In Progress</option>

                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
