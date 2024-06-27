import React from 'react';
import './Card.css';

const Card = ({ task, onDelete, onUpdate, statuses }) => {
  const handleUpdateClick = () => {
    onUpdate(task.pkid_task, { name: 'Updated Task Name', description: 'Updated Description', fkid_status: task.fkid_status });
  };

  const statusName = statuses.find(status => status.pkid_status === task.fkid_status)?.name || 'Unknown Status';

  return (
    <div className="card">
      <h2>{task.name}</h2>
      <h4>Description: {task.description}</h4>
      <h4>Status: {statusName}</h4>
      <h4>Created at: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(task.created_at))}</h4>
      <div className="card-buttons">
        <button className="card-button update" onClick={handleUpdateClick}>Update</button>
        <button className="card-button delete" onClick={() => onDelete(task.pkid_task)}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
