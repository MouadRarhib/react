import React, { useState, useEffect } from 'react';
import List from './List';
import './Card.css';

import { getUsers, createUser, updateUser, deleteUser } from '../../services/axiosConfig';

const User = ({ title }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [newUser, setNewUser] = useState({ full_name: '', role: '', email: '', password: '' });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUserClick = () => {
    setFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(newUser);
      setUsers([...users, response.data]);
      setNewUser({ full_name: '', role: '', email: '', password: '' });
      setFormVisible(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error adding user:', error.response.data);
        setError(error.response.data.errors); // Assuming errors are returned in this structure
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setError(null); // Clear any previous errors
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.pkid_user !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      const response = await updateUser(id, updatedUser);
      const updatedUsers = users.map(user =>
        (user.pkid_user === id ? response.data : user)
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="board">
      <h2>{title}</h2>
      <div className="card-button">
        <button className="card-button-add" onClick={handleAddUserClick}>Add User</button>
      </div>
      {isFormVisible && (
        <form className="user-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={newUser.full_name}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newUser.role}
            onChange={handleFormChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleFormChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleFormChange}
            required
          />
          <div className="buttons">
            <button className="card-button-done" type="submit">Done</button>
            <button className="card-button-cancel" type="button" onClick={handleFormCancel}>Cancel</button>
          </div>
        </form>
      )}
      {error && (
        <div className="error-message">
          <p>Error: {error.message}</p>
          <ul>
            {Object.values(error.errors).map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="lists">
        <List title="Users" users={users} onDelete={handleDeleteUser} onUpdate={handleUpdateUser} />
      </div>
    </div>
  );
};

export default User;
