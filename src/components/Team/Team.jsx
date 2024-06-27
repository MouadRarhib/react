import React, { useState } from 'react';
import List from '../Team/List';

const Team = ({ title, lists }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', username: '', description: '' });

  const handleAddTaskClick = () => {
    setFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic to add the new task to the board goes here

    // Reset form and hide it
    setNewTask({ title: '', username: '', description: '' });
    setFormVisible(false);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };

  return (
    <div className="board">
      <h2>{title}</h2>

      <div className="card-button">
        <button className="card-button-add" onClick={handleAddTaskClick}>Add team</button>
      </div>

      {isFormVisible && (
        <form className="task-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Name employe"
            value={newTask.username}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleFormChange}
          />
          <div className='buttons'>
            <button className="card-button-done" type="submit">Done</button>
            <button className="card-button-cancel" type="button" onClick={handleFormCancel}>Cancel</button>
          </div>
        </form>
      )}
      
      <div className="lists">
        {lists.map((list, index) => (
          <List key={index} title={list.title} username={list.username} cards={list.cards} />
        ))}
      </div>

    </div>
  );
};

export default Team;
