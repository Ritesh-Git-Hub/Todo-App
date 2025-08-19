// ViewTasks.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ViewTasks.css";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos"); // <-- Backend call
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ Auto-fetch when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="view-tasks">
      <h2>All Tasks</h2>

      <div className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`task-card ${task.important ? "important" : ""}`}
            >
              <h3>
                {task.title} {task.important && "⭐"}
              </h3>
              <p>{task.description}</p>

              {/* ✅ Show status based on backend's `completed` field */}
              <p
                className={`status ${task.completed ? "completed" : "pending"}`}
              >
                Status: {task.completed ? "Completed" : "Pending"}
              </p>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>

      {/* Back to Home */}
      <div className="back-home">
        <Link to="/">
          <button className="home-btn">⬅ Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewTasks;
