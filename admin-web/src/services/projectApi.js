import api from './api';

export const getAllProjects = () => {
  return api.get('/projects/admin/all'); // We'll need to ensure this route exists or use a more general one
};

export const updateProjectStatus = (projectId, status) => {
  return api.patch(`/projects/${projectId}/status`, { status });
};

export const getProjectDetails = (projectId) => {
  return api.get(`/projects/${projectId}`);
};
