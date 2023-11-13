import React from "react";
import "./login.scss";
import { Roboto } from "next/font/google";
import styles from "../../app/login.module.scss";

const Login = () => {
  return (
    <div className="container">
      <div className="header">
        <h3 style={{ color: "#a442f1" }}>Reservar</h3>
        <div className="headerRight">
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
          <h4>¿Olvidaste tu contraseña?</h4>
          <div className="form-group">
            <button>Ingresar</button>
          </div>
        </form>
        <h4 style={{ marginTop: "4rem" }}>¿No tenés una cuenta? Registrate</h4>
      </div>
    </div>
  );
};

export default Login;
