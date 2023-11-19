import axios from "axios";

export const userServiceRegister = (formData) => {
  return axios
    .post(`http://localhost:5001/api/users/register`, {
      ...formData,
      role: "client",
    })
    .catch((error) => {
      console.error("Error al registrar:", error);
    });
};

export const userServiceLogin = (userData) => {
  return axios
    .post(`http://localhost:5001/api/users/login`, userData, {
      withCredentials: true,
    })
    .catch((error) => {
      console.error("Error al Iniciar Sesion: ", error);
    });
};
