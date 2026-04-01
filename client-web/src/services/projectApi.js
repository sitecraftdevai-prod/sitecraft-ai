import API from './api';

export const createProject = (projectData) => {
  return API.post('/projects/create', projectData);
};

export const listProjects = () => {
  return API.get('/projects/list');
};

export const getProjectInsights = (projectId) => {
  return API.get(`/ai/${projectId}`);
};

export const updateProjectStatus = (projectId, status) => {
  return API.patch(`/projects/${projectId}/status`, { status });
};
