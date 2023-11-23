// "use client";
import { setUser } from "@/state/user";
import axios from "axios";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

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

// export const userServiceAdmin = (formData, id) => {
//   return axios.put(`http://localhost:5001/api/users/${id}`, formData);
// };

export const userServiceClient = (formData, id) => {
  return axios.put(`http://localhost:5001/api/users/edit-user/${id}`, {
    formData,
  });
};
