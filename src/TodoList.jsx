import React, { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from local storage or set to an empty array if none exist
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditText(tasks[index]);
  }

  function handleSave(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editText;
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditText("");
  }

  function handleEditChange(event) {
    setEditText(event.target.value);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  style={{ flexGrow: 1, fontSize: "1.6rem", padding: "10px" }} // Add any additional styles needed to match <span>
                />
                <button
                  className="save-button"
                  onClick={() => handleSave(index)}
                >
                  Save
                </button>
                <button
                  className="edit-button"
                  onClick={() => setEditIndex(-1)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="text">{task}</span>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskUp(index)}
                >
                  👆
                </button>
                <button
                  className="down-button"
                  onClick={() => moveTaskDown(index)}
                >
                  👇
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
