import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from "./components/TodoList";
import TaskDetail from "./components/TaskDetail";
import "./styles/main.css";

function App() {
  // Shared state (so changes persist between pages)
  const [tasks, setTasks] = useState([]);

  return (
  <Router>
      <Routes>
        <Route path="/" element={<TodoList tasks={tasks} setTasks={setTasks} />} />
        <Route path="/task/:id" element={<TaskDetail tasks={tasks} setTasks={setTasks} />} />
      </Routes>
    </Router>
  );
}

export default App
