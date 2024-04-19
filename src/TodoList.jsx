import React, { useState } from 'react';

function TodoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);

    }

    function addTask() {
        if (newTask.trim() != "")
            setTasks(t => [...t, newTask]);
        setNewTask('');
    }

    function deleteTask(index) {
        const updateTasks = tasks.filter((_, i) => i !== index);
        setTasks(updateTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
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
        setEditIndex(-1); // Exit edit mode
        setEditText("");
    }

    function handleEditChange(event) {
        setEditText(event.target.value);
    }

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
            <><span className='text'>{task}</span>
                <input 
                    type="text" 
                    value={editText} 
                    onChange={handleEditChange}
                />
                
                <button className='save-button' onClick={() => handleSave(index)}>Save</button>
                <button className='edit-button' onClick={() => setEditIndex(-1)}>Cancel</button>
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
    )
}
export default TodoList
