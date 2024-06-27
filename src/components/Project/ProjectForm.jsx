import React, { useState, useEffect } from 'react';
import './ProjectForm.css';
import { createProject, updateProject } from '../../services/axiosConfig';

const ProjectForm = ({ onSubmit, onCancel, initialValues }) => {
  const [project, setProject] = useState({
    name: initialValues.name || '',
    end_date: initialValues.end_date || '',
    fkid_task: initialValues.fkid_task || '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialValues.id) {
        await updateProject(initialValues.id, project);
      } else {
        const response = await createProject(project);
        onSubmit(response.data);
      }
      setProject({ name: '', end_date: '', fkid_task: '' });
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
    setProject({ name: '', end_date: '', fkid_task: '' });
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Project Name"
        value={project.name}
        onChange={handleFormChange}
        required
      />
      <input
        type="date"
        name="end_date"
        placeholder="End Date"
        value={project.end_date}
        onChange={handleFormChange}
      />
      <input
        type="number"
        name="fkid_task"
        placeholder="Task ID"
        value={project.fkid_task}
        onChange={handleFormChange}
      />
      <div className='buttons'>
        <button className="card-button-done" type="submit">{initialValues.id ? 'Update' : 'Add'} Project</button>
        <button className="card-button-cancel" type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProjectForm;
