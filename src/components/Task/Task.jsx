import React, { useState, useEffect } from 'react';
import './Task.css';
import './Card.css';
import List from '../Task/List';
import { getTasks, createTask, updateTask, deleteTask, getStatuses } from '../../services/axiosConfig';

const Task = ({ title }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', description: '', fkid_status: '' });
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchStatuses();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await getStatuses();
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  const handleAddTaskClick = () => {
    setNewTask({ name: '', description: '', fkid_status: '' });
    setFormVisible(true);
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateTask(newTask.pkid_task, newTask);
      } else {
        await createTask(newTask);
      }
      setFormVisible(false);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.pkid_task !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTaskClick = (task) => {
    setNewTask(task);
    setFormVisible(true);
    setIsEditing(true);
  };

  return (
    <div className="board">
      <h2>{title}</h2>
      <div className="card-button">
        <button className="card-button-add" onClick={handleAddTaskClick}>Add Task</button>
      </div>
      {isFormVisible && (
        <form className="task-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={newTask.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleFormChange}
          />
          <select
            name="fkid_status"
            value={newTask.fkid_status}
            onChange={handleFormChange}
            required
          >
            <option value="" disabled>Select Status</option>
            {statuses.map((status) => (
              <option key={status.pkid_status} value={status.pkid_status}>
                {status.name}
              </option>
            ))}
          </select>
          <div className="buttons">
            <button className="card-button-done " type="submit">Done</button>
            <button className="card-button-cancel" type="button" onClick={handleFormCancel}>Cancel</button>
          </div>
        </form>
      )}
      <div className="lists">
        {tasks.map((task) => (
          <List
            key={task.pkid_task}
            task={task}
            onDelete={handleDeleteTask}
            onUpdate={handleEditTaskClick}
            statuses={statuses} // Pass statuses to List
          />
        ))}
      </div>
    </div>
  );
};

export default Task;
