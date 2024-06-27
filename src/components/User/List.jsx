import React from 'react';
import './List.css';
import Card from './Card';

const List = ({ title, users, onDelete, onUpdate }) => {
  return (
    <div className="list">
      <h3>{title}</h3>
      <div className="cards">
        {users.map((user, index) => (
          <Card key={index} user={user} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
};

export default List;
