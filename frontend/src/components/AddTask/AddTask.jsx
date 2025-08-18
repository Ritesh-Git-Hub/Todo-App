import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddTask.css";

function AddTask() {
  const [task, setTask] = useState({ 
    title: "", 
    description: "", 
    important: false 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Task Added:\nTitle: ${task.title}\nDescription: ${task.description}\nImportant: ${task.important ? "Yes ⭐" : "No"}`
    );
    setTask({ title: "", description: "", important: false });
  };

  return (
    <div className="add-task">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        
        {/* Task Title */}
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
          required
        ></textarea>

        {/* Important Task Checkbox */}
        <label className="important-check">
          <input
            type="checkbox"
            name="important"
            checked={task.important}
            onChange={handleChange}
          />
          ⭐ Mark as Important
        </label>

        {/* Submit */}
        <button type="submit" className="submit-btn">Add Task</button>
      </form>

      {/* Back to Home */}
      <div className="back-home">
        <Link to="/">
          <button className="home-btn">⬅ Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default AddTask;
