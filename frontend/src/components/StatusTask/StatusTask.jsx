// StatusTask.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StatusTask.css";

function StatusTask() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", status: "Pending" },
    { id: 2, title: "Finish project", status: "Completed" },
    { id: 3, title: "Workout", status: "Pending" },
  ]);

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" }
          : task
      )
    );
  };

  return (
    <div className="status-page">
      <h2 className="title">Task Status</h2>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span
              className={`task-title ${
                task.status === "Completed" ? "completed" : "pending"
              }`}
            >
              {task.title}
            </span>
            <button
              className={`status-btn ${
                task.status === "Completed" ? "completed-btn" : "pending-btn"
              }`}
              onClick={() => toggleStatus(task.id)}
            >
              {task.status}
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
