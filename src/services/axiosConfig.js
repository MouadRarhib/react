import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Laravel API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// API Service Methods
export const getProjects = () => axiosInstance.get('/projects/all');
export const createProject = (project) => axiosInstance.post('/projects/store', project);
export const updateProject = (id, project) => axiosInstance.put(`/projects/update/${id}`, project);
export const deleteProject = (id) => axiosInstance.delete(`/projects/delete/${id}`);

export default axiosInstance;
