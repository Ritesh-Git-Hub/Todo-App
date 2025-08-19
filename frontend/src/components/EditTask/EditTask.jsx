// EditTask.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EditTask.css";

function EditTask() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // ✅ Fetch tasks from backend on page load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todos");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Save edited task to backend
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/${editingTask._id}`, // backend expects MongoDB _id
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingTask),
        }
      );

      if (response.ok) {
        const updatedTask = await response.json();
        // update frontend state
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setEditingTask(null);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-task-page">
      <h2 className="title">Edit Task</h2>

      {/* ✅ Task List (from backend) */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <span>
              {task.title} {task.important && "⭐"}
            </span>
            <button className="edit-btn" onClick={() => handleEditClick(task)}>
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editingTask && (
        <div className="edit-form">
          <h3>Editing: {editingTask.title}</h3>
          <input
            type="text"
            name="title"
            value={editingTask.title}
            onChange={handleChange}
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={editingTask.description}
            onChange={handleChange}
            placeholder="Task Description"
          />
          <label>
            <input
              type="checkbox"
              name="important"
              checked={editingTask.important}
              onChange={handleChange}
            />
            Mark as Important ⭐
          </label>
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}

      {/* Back Button */}
      <Link to="/" className="back-btn">⬅ Back to Homepage</Link>
    </div>
  );
}

export default EditTask;
