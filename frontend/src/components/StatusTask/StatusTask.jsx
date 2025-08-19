// StatusTask.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StatusTask.css";

function StatusTask() {
  const [tasks, setTasks] = useState([]);

  // 🔹 Fetch all tasks from backend when page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // 🔹 Toggle status (calls backend)
  const toggleStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}/toggle`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("Failed to toggle status");
      }

      const updatedTask = await res.json();

      // 🔹 Update frontend state after backend success
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  return (
    <div className="status-page">
      <h2 className="title">Task Status</h2>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <span
              className={`task-title ${
                task.completed ? "completed" : "pending"
              }`}
            >
              {task.title}
            </span>
            <button
              className={`status-btn ${
                task.completed ? "completed-btn" : "pending-btn"
              }`}
              onClick={() => toggleStatus(task._id)}
            >
              {task.completed ? "Completed" : "Pending"}
            </button>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <Link to="/" className="back-btn">⬅ Back to Homepage</Link>
    </div>
  );
}

export default StatusTask;
