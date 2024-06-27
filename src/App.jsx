import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
// import Board from './components/Board/Board';
import Project from './components/Project/Project';
import Team from './components/Team/Team';
import User from './components/User/User';
import Task from './components/Task/Task';
import './App.css';

const App = () => {
  const tasks_list = {
    title: 'Project Board',
    lists: [
      {
        title: 'To Do',
        username: 'Username',
        cards: [
          { text: 'Task 1' },
          { text: 'Task 2' },
        ],
      },
      {
        title: 'In Progress',
        username: 'Username',
        cards: [
          { text: 'Task 3' },
        ],
      },
      {
        title: 'Done',
        username: 'Username',
        cards: [
          { text: 'Task 4' },
          { text: 'Task 5' },
        ],
      },
    ],
  };

  const teams_list = {
    title: 'Project Board',
    lists: [
      {
        title: 'To Do',
        username: 'Username',
        cards: [
          { text: 'Task 1' },
          { text: 'Task 2' },
        ],
      },
      {
        title: 'In Progress',
        username: 'Username',
        cards: [
          { text: 'Task 3' },
        ],
      },
      {
        title: 'Done',
        username: 'Username',
        cards: [
          { text: 'Task 4' },
          { text: 'Task 5' },
        ],
      },
    ],
  };

  const projects_list = {
    title: 'Project Board',
    lists: [
      {
        title: 'To Do',
        username: 'Username',
        cards: [
          { text: 'Task 1' },
          { text: 'Task 2' },
        ],
      },
      {
        title: 'In Progress',
        username: 'Username',
        cards: [
          { text: 'Task 3' },
        ],
      },
      {
        title: 'Done',
        username: 'Username',
        cards: [
          { text: 'Task 4' },
          { text: 'Task 5' },
        ],
      },
    ],
  };

  const users_list = {
    title: 'Project Board',
    lists: [
      {
        title: 'To Do',
        username: 'Username',
        cards: [
          { text: 'Task 1' },
          { text: 'Task 2' },
        ],
      },
      {
        title: 'In Progress',
        username: 'Username',
        cards: [
          { text: 'Task 3' },
        ],
      },
      {
        title: 'Done',
        username: 'Username',
        cards: [
          { text: 'Task 4' },
          { text: 'Task 5' },
        ],
      },
    ],
  };
  const sampleBoard = {
    title: 'Project Board',
    lists: [
      {
        title: 'To Do',
        username: 'Username',
        cards: [
          { text: 'Task 1' },
          { text: 'Task 2' },
        ],
      },
      {
        title: 'In Progress',
        username: 'Username',
        cards: [
          { text: 'Task 3' },
        ],
      },
      {
        title: 'Done',
        username: 'Username',
        cards: [
          { text: 'Task 4' },
          { text: 'Task 5' },
        ],
      },
    ],
  };
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/teams" element={<Team title={teams_list.title} lists={teams_list.lists} />} />
            <Route path="/users" element={<User title={users_list.title} lists={users_list.lists} />} />
            {/* <Route path="/tasks" element={<Task/>}/> */}
            <Route path="/tasks"  element={<Task title={tasks_list.title} lists={tasks_list.lists} />}  />
            <Route path="/" element={<Project title={projects_list.title} lists={projects_list.lists} />} />
            <Route path="/projects"  element={<Project title={projects_list.title} lists={projects_list.lists} />} />
          
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
