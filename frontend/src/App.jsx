import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import AddTask from "./components/AddTask/AddTask.jsx";
import ViewTasks from "./components/ViewTasks/ViewTasks.jsx";
import DeleteTask from "./components/DeleteTask/DeleteTask.jsx";
import EditTask from "./components/EditTask/EditTask.jsx";
import StatusTask from "./components/StatusTask/StatusTask.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/view" element={<ViewTasks />} />
        <Route path="/delete" element={<DeleteTask />} />
        <Route path="/edit" element={<EditTask />} />
        <Route path="/status" element={<StatusTask />} />
        <Route path="/view" element={<ViewTasks />} />
        <Route path="/delete" element={<DeleteTask />} />
        <Route path="/edit" element={<EditTask />} />
        <Route path="/status" element={<StatusTask />} />
      </Routes>
    </Router>
  );
}

export default App;
