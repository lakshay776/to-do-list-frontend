import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import setCompleted from '../middlewares/setCompleted.js'
import deleteTask from '../middlewares/deleteTasks.js'
import addNewTask from '../middlewares/addTask.js'
import './ToDo.css'
function ToDo() {
  const [tasks,setTasks]= useState([])
  const [newTask, setNewTask]=useState({
    taskName:"", 
    taskDescription:"",
    status:false
  })
  const [showModal,setShowModal]=useState(false)
  async function fetchTasks() {
      try {
        const res = await fetch('http://localhost:8000/todos/getTask')
        const data = await res.json()
        
        setTasks(data.filter(e=>e.status==false))
      } catch (err) {
        console.log(err)
      }
    }
  const handleAddTask = async () => {
    const result = await addNewTask(newTask)
    if (result.success) {
      await fetchTasks()
      setShowModal(false)
      setNewTask({ taskName: "", taskDescription: "", status: false })
    }
  }

  // Handle task deletion
  const handleDeleteTask = async (taskName) => {
    await deleteTask(taskName)
    await fetchTasks()
  }

  // Handle task completion
  const handleSetCompleted = async (taskName) => {
    await setCompleted(taskName)
    await fetchTasks()
  }
    useEffect(() => {
      fetchTasks()
    }, [])
  return (
    <>
    <h1>TODO APP</h1>
    <button 
          className='add-button'
          onClick={() => setShowModal(true)}
        >
          + New Task
        </button>
    
      {showModal && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Task name"
              value={newTask.taskName}
              onChange={(e) => setNewTask({...newTask, taskName: e.target.value})}
            />
            <textarea
              placeholder="Task description"
              value={newTask.taskDescription}
              onChange={(e) => setNewTask({...newTask, taskDescription: e.target.value})}
            />
            <div className='modal-buttons'>
              <button className='save-button' onClick={handleAddTask}>Save Task</button>
              <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}


    <div>
      <div className='tasks-container'>
        {tasks.length === 0 ? (
          <div className='no-tasks'>
            <p>No tasks yet. Add your first task!</p>
          </div>
        ) : (
          <div className='tasks-list'>
            {tasks.map((task, index) => (
              <div key={index} className={`task-card ${task.status ? 'completed' : ''}`}>
                <div className='task-header'>
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => handleSetCompleted(task.taskName)}
                  />
                  <h3>{task.taskName}</h3>
                  <button 
                    className='delete-button'
                    onClick={() => handleDeleteTask(task.taskName)}
                  >
                    
                  </button>
                </div>
                <p className='task-description'>{task.taskDescription}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>



    
    </>
  )
}

export default ToDo