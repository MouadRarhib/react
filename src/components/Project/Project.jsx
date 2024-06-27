import React, { useState, useEffect } from 'react';
import './Project.css';
import './Card.css'; // Ensure Card.css is imported here if not already
import { getProjects, createProject, updateProject, deleteProject } from '../../services/axiosConfig';

const Project = ({ title }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', end_date: '', fkid_task: '', created_at: '' });
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddProjectClick = () => {
    setFormVisible(true);
    setSelectedProject(null); // Clear selected project for add operation
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedProject) {
        // Update existing project
        response = await updateProject(selectedProject.pkid_project, newProject);
        const updatedProjects = projects.map((project) =>
          project.pkid_project === selectedProject.pkid_project ? response.data : project
        );
        setProjects(updatedProjects);
      } else {
        // Add new project
        response = await createProject(newProject);
        setProjects([...projects, response.data]);
      }
      setNewProject({ name: '', end_date: '', fkid_task: '', created_at: '' });
      setFormVisible(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setSelectedProject(null); // Clear selected project on cancel
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.pkid_project !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleUpdateProject = (project) => {
    setSelectedProject(project);
    setNewProject({
      name: project.name,
      end_date: project.end_date,
      fkid_task: project.fkid_task,
      created_at: project.created_at,
    });
    setFormVisible(true);
  };

  return (
    <div className="board">
      <h2>{title}</h2>

      <div className="card-button">
        <button className="card-button-add" onClick={handleAddProjectClick}>
          Add Project
        </button>
      </div>

      {isFormVisible || selectedProject ? (
        <form className="task-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={newProject.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="date"
            name="end_date"
            placeholder="End Date"
            value={newProject.end_date}
            onChange={handleFormChange}
          />
          <input
            type="number"
            name="fkid_task"
            placeholder="Task ID"
            value={newProject.fkid_task}
            onChange={handleFormChange}
          />
          <div className="buttons">
            <button className="card-button-done" type="submit">
              Done
            </button>
            <button
              className="card-button-cancel"
              type="button"
              onClick={handleFormCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="lists">
        {projects.map((project) => (
          <div key={project.pkid_project} className="project-card">
            <div className="card">
              <h2>{project.name}</h2>
              <h4>Created at: {project.created_at}</h4>
              <div className="card-buttons">
                <button
                  className="card-button update"
                  onClick={() => handleUpdateProject(project)}
                >
                  Update
                </button>
                <button
                  className="card-button delete"
                  onClick={() => handleDeleteProject(project.pkid_project)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
