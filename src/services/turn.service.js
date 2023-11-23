"use client";
import axios from "axios";

export const turnService = (id) => {
  return axios
    .get(`http://localhost:5001/api/users/single/${id}`)
    .then((res) => res.data);
};
