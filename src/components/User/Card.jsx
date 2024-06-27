import React from 'react';
import './Card.css';

function Card({ user, onDelete, onUpdate }) {
  const handleUpdateClick = () => {
    onUpdate(user.pkid_user, user); // Passes user ID and user object for updating
  };

  return (
    <div className="card">
      <h2>{user.full_name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <div className="card-buttons">
        <button className="card-button update" onClick={handleUpdateClick}>
          Update
        </button>
        <button className="card-button delete" onClick={() => onDelete(user.pkid_user)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
