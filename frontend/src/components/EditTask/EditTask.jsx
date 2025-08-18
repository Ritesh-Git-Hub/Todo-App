// EditTask.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EditTask.css";

function EditTask() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", description: "Milk, Bread, Eggs", important: false },
    { id: 2, title: "Finish project", description: "Complete frontend by tonight", important: true },
    { id: 3, title: "Workout", description: "30 mins running", important: false },
  ]);

  const [editingTask, setEditingTask] = useState(null);

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

  const handleSave = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? editingTask : task
      )
    );
    setEditingTask(null);
  };

  return (
    <div className="edit-task-page">
      <h2 className="title">Edit Task</h2>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
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
