import React from "react";
import { useRouter } from "next/router";

const userService = ({ formData }) => {
  const navigate = useRouter();
  axios
    .post(`http://localhost:5000/api/users/register`, {
      ...formData,
      role: "client",
    })
    .then((response) => {
      setUserId(response.data.id);
      setFormData({
        fullName: "",
        dni: 0,
        email: "",
        password: "",
        repPassword: "",
      });
      navigate.push("/login");
    })
    .catch((error) => {
      setError(
        "Error al registrar. Verifica tus datos e inténtalo nuevamente."
      );
    });
  console.log(formData);
};

export default userService;
