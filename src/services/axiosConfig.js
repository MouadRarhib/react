import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Laravel API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// API Service Methods for Projects
export const getProjects = () => axiosInstance.get('/projects/all');
export const createProject = (project) => axiosInstance.post('/projects/store', project);
export const updateProject = (id, project) => axiosInstance.put(`/projects/update/${id}`, project);
export const deleteProject = (id) => axiosInstance.delete(`/projects/delete/${id}`);

// API Service Methods for Tasks
export const getTasks = () => axiosInstance.get('/tasks/all');
export const createTask = (task) => axiosInstance.post('/tasks/store', task);
export const updateTask = (id, task) => axiosInstance.put(`/tasks/update/${id}`, task);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/delete/${id}`);
export const getStatuses = () => axiosInstance.get('/statuses/all');

// User API functions
export const getUsers = () => axiosInstance.get('/users/all');
export const createUser = (user) => axiosInstance.post('/users/store', user);
export const updateUser = (id, user) => axiosInstance.put(`/users/update/${id}`, user);
export const deleteUser = (id) => axiosInstance.delete(`/users/delete/${id}`);

export default axiosInstance;
