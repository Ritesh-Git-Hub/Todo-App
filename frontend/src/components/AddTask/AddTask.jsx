import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddTask.css";

function AddTask() {
  const [task, setTask] = useState({ 
    title: "", 
    description: "", 
    important: false 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 🔗 FRONTEND → BACKEND connection
      // Sending task data to backend API: POST /api/todos
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task), // send task object as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // 🔗 BACKEND → FRONTEND response
      // Parsing the response data (newly created todo from MongoDB)
      const data = await response.json();

      setMessage(`✅ Task Added: ${data.title}`);
      setTask({ title: "", description: "", important: false }); // reset form
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Show success/error message */}
      {message && <p className="status-message">{message}</p>}

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
