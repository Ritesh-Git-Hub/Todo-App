import React from "react";
import { Link } from "react-router-dom";
import "./DeleteTask.css";

function DeleteTask() {
  // Dummy tasks (later we can connect with backend / state)
  const tasks = [
    { id: 1, title: "Buy groceries" },
    { id: 2, title: "Finish project" },
    { id: 3, title: "Workout" },
  ];

  return (
    <div className="delete-tasks">
      <h2>Delete Task</h2>
      <div className="delete-list">
        {tasks.map((task) => (
          <div key={task.id} className="delete-card">
            <span>{task.title}</span>
            <button className="delete-btn">Delete</button>
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
