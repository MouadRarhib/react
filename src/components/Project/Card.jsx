import React from 'react';
import './Card.css';

function Card({ name, created_at }) {
  // Parse the ISO 8601 date string
  const dateObject = new Date(created_at);

  // Format the date to MM/DD/YYYY
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObject);

  return (
    <div className="card">
      <h2>{name}</h2>
      <h4>Created at: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(task.created_at))}</h4>
      <div className="card-buttons">
        <button className="card-button update">Update</button>
        <button className="card-button delete">Delete</button>
      </div>
    </div>
  );
}

export default Card;
