import axios from "axios";

export const userServiceRegister = (formData) => {
  return axios
    .post(`http://localhost:5000/api/users/register`, {
      ...formData,
      role: "client",
    })
    .then(() => {
      console.log(formData);
    })
    .catch((error) => {
      console.error("Error al registrar:", error);
    });
};
export const userServiceLogin = (userData) => {
  return axios
    .post(`http://localhost:5000/api/users/login`, userData, {
      withCredentials: true,
    })
    .then(() => {
      console.log(userData);
    })
    .catch(() => {
      console.log(
        "Error al Iniciar Sesion. Verifica tus datos e inténtalo nuevamente."
      );
    });
};
