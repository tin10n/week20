// src/components/TodoList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function TodoList({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const generateId = () => Date.now().toString() + Math.floor(Math.random() * 1000);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: generateId(), title: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const handleEdit = (task) => {
    navigate(`/task/${task.id}`, { state: { task } });
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>

      <div className="input-group">
        <input
          type="text"
          value={newTask}
          placeholder="Add a new task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p>There is no current task.</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <div>
                <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;


