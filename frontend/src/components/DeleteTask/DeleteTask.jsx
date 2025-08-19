import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DeleteTask.css";

function DeleteTask() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  // 🔗 FRONTEND → BACKEND (GET all tasks)
  // Fetch tasks from backend when page loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todos");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setMessage(`❌ Error: ${err.message}`);
      }
    };
    fetchTasks();
  }, []);

  // 🔗 FRONTEND → BACKEND (DELETE task)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");

      // 🔗 BACKEND → FRONTEND (update UI after successful delete)
      setTasks(tasks.filter((task) => task._id !== id));
      setMessage("✅ Task deleted successfully");
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="delete-tasks">
      <h2>Delete Task</h2>

      {/* Show messages */}
      {message && <p className="status-message">{message}</p>}

      <div className="delete-list">
        {tasks.map((task) => (
          <div key={task._id} className="delete-card">
            <span>{task.title}</span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(task._id)} // Delete on click
            >
              Delete
            </button>
          </div>
        ))}
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

export default DeleteTask;
