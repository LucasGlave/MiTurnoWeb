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

// export const userServiceMe = (userData) => {

//   return axios
//     .get(`http://localhost:5001/api/users/me`,{
//       withCredentials: true,
//     })
//     .then((res)=> res.data)
// };

// export const userServiceForgotPassword = (userData) => {
//   return axios
//     .post(`http://localhost:5001/api/users/forgot-password`, userData, {
//       withCredentials: true,
//     })
//     .then(() => {
//       console.log(userData);
//     })
//     .catch(() => {
//       console.log(
//         "Error al Iniciar Sesion. Verifica tus datos e inténtalo nuevamente."
//       );
//     });
// };
