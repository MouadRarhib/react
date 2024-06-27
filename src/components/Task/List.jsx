import React from 'react';

const List = ({ title, username, cards = [] }) => {  // Provide a default empty array for cards
  return (
    <div className="list">
      <h3>{title}</h3>
      <p>{username}</p>
      <div className="cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
