"use client";
import axios from "axios";
axios.defaults.withCredentials = true;
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

export const turnServiceGetByConfirmationAndUser = (userId) => {
  return axios
    .get(
      `http://localhost:5001/api/turns/by-confirmation-and-user/${"pending"}/${userId}`
    )
    .then((turns) => turns.data);
};

export const turnServiceById = (id) => {
  return axios
    .get(`http://localhost:5001/api/turns/${id}`)
    .then((turn) => turn.data);
};

export const turnServiceConfirm = (id) => {
  return axios.put(`http://localhost:5001/api/turns/confirm-turn/${id}`);
};

export const turnServiceCancel = (id, reason_cancellation) => {
  return axios.put(`http://localhost:5001/api/turns/cancel-turn/${id}`, {
    reason_cancellation,
  });
};
