import axios from "axios";
axios.defaults.withCredentials = true;
export const branchOfficeServiceAll = () => {
  return axios.get("http://localhost:5001/api/branch-offices");
};

export const branchOfficeServiceCreate = (formData) => {
  return axios.post("http://localhost:5001/api/branch-offices/create", {
    ...formData,
  });
};

export const branchOfficeServiceGetDates = (id) => {
  return axios.get(
    `http://localhost:5001/api/branch-offices/unavailable-days/${id}`
  );
};

export const branchOfficeServiceGetSingle = (id) => {
  return axios.get(`http://localhost:5001/api/branch-offices/single/${id}`);
};

export const branchOfficeServiceEdit = (id, data) => {
  return axios.put(`http://localhost:5001/api/branch-offices/edit/${id}`, data);
};

export const branchOfficeServiceDelete = (id) => {
  return axios.delete(`http://localhost:5001/api/branch-offices/${id}`);
};
