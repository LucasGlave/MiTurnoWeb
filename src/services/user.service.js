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

export const userServiceForgotPassword = (email) => {
  console.log(email);
  return axios
    .put(`http://localhost:5001/api/users/restore-password`, { email })

    .catch((error) => {
      console.log(
        "Error al solicitar la recuperacion de contraseña. Verifica tus datos e inténtalo nuevamente.",
        error
      );
      throw error;
    });
};
