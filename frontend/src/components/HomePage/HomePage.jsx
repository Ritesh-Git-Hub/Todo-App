import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <h1 className="title">Todo App</h1>

      <div className="button-group">
        <Link to="/add"><button className="btn add">Add</button></Link>
        <Link to="/view"><button className="btn view">View</button></Link>
        <Link to="/delete"><button className="btn delete">Delete</button></Link>
        <Link to="/edit"><button className="btn edit">Edit</button></Link>
        <Link to="/status"><button className="btn status">Status</button></Link>
      </div>
    </div>
  );
}

export default HomePage;
