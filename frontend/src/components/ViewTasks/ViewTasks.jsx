import React from "react";
import { Link } from "react-router-dom";
import "./ViewTasks.css";

function ViewTasks() {
  // Dummy tasks (later we can replace with API/database)
  const tasks = [
    { id: 1, title: "Buy groceries", description: "Milk, Bread, Eggs", important: true },
    { id: 2, title: "Finish project", description: "Complete React assignment", important: false },
    { id: 3, title: "Workout", description: "1 hour gym session", important: true },
  ];

  return (
    <div className="view-tasks">
      <h2>All Tasks</h2>
      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.important ? "important" : ""}`}>
            <h3>{task.title} {task.important && "⭐"}</h3>
            <p>{task.description}</p>
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

export default ViewTasks;
