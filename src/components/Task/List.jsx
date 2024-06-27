import React from 'react';
import './List.css';

const List = ({ task, onDelete, onUpdate, statuses }) => {
  const taskStatus = statuses.find(status => status.pkid_status === task.fkid_status);

  return (
    <div className="task-card">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Status: {taskStatus ? taskStatus.name : 'Unknown'}</p>
      <div className="task-buttons">
        <button className="task-button-edit" onClick={() => onUpdate(task)}>Edit</button>
        <button className="task-button-delete" onClick={() => onDelete(task.pkid_task)}>Delete</button>
      </div>
    </div>
  );
};

export default List;
