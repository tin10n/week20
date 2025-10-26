// src/components/TaskDetail.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function TaskDetail({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [task, setTask] = useState(state?.task || {});

  useEffect(() => {
    // If page is reloaded, try to find the task from the list
    if (!task?.id) {
      const found = tasks.find((t) => t.id === id);
      if (found) setTask(found);
    }
  }, [id, task, tasks]);

  const handleSave = () => {
    // Update tasks array
    const updatedTasks = tasks.map(t => t.id === id ? task : t);
    setTasks(updatedTasks);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edit Task</h2>
      <input
        type="text"
        value={task.title || ""}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button className="cancel" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskDetail;
