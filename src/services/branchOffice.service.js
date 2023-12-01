import axios from "axios";

export const branchOfficeServiceAll = () => {
  return axios.get("http://localhost:5001/api/branch-offices/");
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

export const branchOfficeServiceGetEdit = (id, data) => {
  return axios.put(`http://localhost:5001/api/branch-offices/edit/${id}`, data);
};
