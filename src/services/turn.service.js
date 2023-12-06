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

export const turnServiceConfirm = (id, body) => {
  return axios.put(`http://localhost:5001/api/turns/confirm-turn/${id}`, body);
};

export const turnServiceCancel = (id, reason_cancellation_id) => {
  return axios.put(`http://localhost:5001/api/turns/cancel-turn/${id}`, {
    reason_cancellation_id,
  });
};

export const turnServiceDashboardGeneral = (id) => {
  return axios.get(`http://localhost:5001/api/turns/dashboard-general/${id}`);
};

export const turnServiceDashboardAdvance = (id) => {
  return axios.get(
    `http://localhost:5001/api/turns/dashboard-in-advance/${id}`
  );
};

export const turnServiceDashboardByTime = (id) => {
  return axios.get(`http://localhost:5001/api/turns/dashboard-by-time/${id}`);
};
