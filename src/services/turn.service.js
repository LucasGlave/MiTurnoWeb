"use client";
import axios from "axios";

export const turnServiceCreate = (formData, userId) => {
  return axios.post(`http://localhost:5001/api/turns/${userId}`, {
    ...formData,
  });
};

export const turnServiceGetByConfirmationAndBranchOffice = (branchOfficeId) => {
  return axios
    .get(
      `http://localhost:5001/api/turns/by-confirmation-and-branch-office/${"pending"}/${branchOfficeId}`
    )
    .then((turns) => turns.data);
};

export const turnServiceById = (id) => {
  return axios.get(`http://localhost:5001/api/turns/${id}`);
};
