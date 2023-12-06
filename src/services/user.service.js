// "use client";
import axios from "axios";
axios.defaults.withCredentials = true;

export const userServiceRegister = (formData) => {
  return axios.post(`http://localhost:5001/api/users/register`, formData);
};

export const userServiceLogin = (userData) => {
  return axios.post(`http://localhost:5001/api/users/login`, userData, {
    withCredentials: true,
  });
};

export const userServiceMe = () => {
  return axios
    .get(`http://localhost:5001/api/users/me`, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const userServiceGetSingle = (id) => {
  return axios
    .get(`http://localhost:5001/api/users/single/${id}`)
    .then((res) => res.data);
};

export const userServiceForgotPassword = (email) => {
  return axios.put(`http://localhost:5001/api/users/restore-password`, {
    email,
  });
};

export const userServiceNewPassword = (password, token) => {
  return axios.post(
    `http://localhost:5001/api/users/overwrite-password/${token}`,
    {
      password,
    },
    {},
    { withCredentials: true }
  );
};

export const userServiceLogout = () => {
  return axios.post(
    `http://localhost:5001/api/users/logout`,
    {},
    { withCredentials: true }
  );
};

export const userServiceClient = (formData, id) => {
  return axios.put(
    `http://localhost:5001/api/users/edit-user/${id}`,
    {
      ...formData,
    },
    { withCredentials: true }
  );
};

export const userServiceEditFromAdmin = (id, formData) => {
  return axios.put(
    `http://localhost:5001/api/users/edit-user-from-admin/${id}`,
    formData
  );
};

export const userServiceConfirmation = (token) => {
  return axios.put(`http://localhost:5001/api/users/confirm-email/${token}`);
};

export const userServiceGetAllOperators = () => {
  return axios.get("http://localhost:5001/api/users/operators");
};

export const userServiceCreateOperators = (formData) => {
  return axios.post(`http://localhost:5001/api/users/register-operator`, {
    ...formData,
  });
};

export const userServiceDelete = (id) => {
  return axios.delete(`http://localhost:5001/api/users/${id}`);
};

export const userServiceChangePassword = (formData, userId) => {
  return axios.put(
    `http://localhost:5001/api/users/change-password/${userId}`,
    formData,
    { withCredentials: true }
  );
};
