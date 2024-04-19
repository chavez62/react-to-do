import React, { useState } from 'react';

function TodoList() {
    // State for storing the list of tasks
    const [tasks, setTasks] = useState([]);
    // State for storing the current input for a new task
    const [newTask, setNewTask] = useState("");
    // State for tracking the index of the task being edited
    const [editIndex, setEditIndex] = useState(-1);
    // State for storing the edited text of a task
    const [editText, setEditText] = useState("");

    // Handles updating the newTask state as the user types into the input field
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Adds a new task to the list of tasks
    function addTask() {
        if (newTask.trim() !== "") // Checks if the newTask is not just whitespace
            setTasks(t => [...t, newTask]); // Adds newTask to the tasks array
        setNewTask(''); // Resets the input field after adding the task
    }

    // Deletes a task based on its index
    function deleteTask(index) {
        const updateTasks = tasks.filter((_, i) => i !== index); // Filters out the task to be deleted
        setTasks(updateTasks); // Updates the tasks array without the deleted task
    }

    // Moves a task up in the list
    function moveTaskUp(index) {
        if (index > 0) { // Ensures the task is not already at the top
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]]; // Swaps the task with the one above it
            setTasks(updatedTasks);
        }
    }

    // Moves a task down in the list
    function moveTaskDown(index) {
        if (index < tasks.length - 1) { // Ensures the task is not at the bottom
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]]; // Swaps the task with the one below it
            setTasks(updatedTasks);
        }
    }

    // Enters the edit mode by setting editIndex and editText
    function handleEdit(index) {
        setEditIndex(index);
        setEditText(tasks[index]);
    }

    // Saves the edited task
    function handleSave(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editText; // Updates the task at the specified index with the new text
        setTasks(updatedTasks); // Updates the tasks array
        setEditIndex(-1); // Resets editIndex to exit edit mode
        setEditText(""); // Clears the editText
    }

    // Handles updating editText as the user types in the edit field
    function handleEditChange(event) {
        setEditText(event.target.value);
    }

    // Component's rendered HTML
    return (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            <div>
                <input type="text"
                    placeholder="Enter a task"
                    value={newTask}
                    onChange={handleInputChange} />
                <button className='add-button'
                    onClick={addTask}>Add Task</button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        {editIndex === index ? (
                            <><input 
                                type="text" 
                                value={editText} 
                                onChange={handleEditChange}
                            />
                            <button className='save-button' onClick={() => handleSave(index)}>Save</button>
                            <button onClick={() => setEditIndex(-1)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span className='text'>{task}</span>
                                <button className='edit-button' onClick={() => handleEdit(index)}>Edit</button>
                                <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                                <button className='move-button' onClick={() => moveTaskUp(index)}>👆</button>
                                <button className='down-button' onClick={() => moveTaskDown(index)}>👇</button>
                            </>
                        )}
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TodoList;
