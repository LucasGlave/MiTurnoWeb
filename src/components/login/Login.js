import React from "react";
import "./login.scss";
import { Roboto } from "next/font/google";

const Login = () => {
  return (
    <div className="container">
      <div className="header">
        <h3>Reservar</h3>
        <div>
          <h3>Mis reservas</h3>
          <h3>Mi cuenta</h3>
        </div>
      </div>
      <div className="card">
        <h1>Iniciar sesión</h1>
        <form>
          <div className="form-group">
            <h2>Usuario</h2>
            <input type="text" />
          </div>
          <div className="form-group">
            <h2>Contraseña</h2>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
