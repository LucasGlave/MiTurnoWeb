import React from "react";
import { Roboto } from "next/font/google";
import styles from "../../app/login.module.scss";
import Header from "../header/Header";

const Login = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.card}>
        <h1>Iniciar sesión</h1>
        <form>
          <div className={styles.group}>
            <h2>Usuario</h2>
            <input type="text" />
          </div>
          <div className={styles.group}>
            <h2>Contraseña</h2>
            <input type="text" className="input-with-icon" />
          </div>
          <h4>¿Olvidaste tu contraseña?</h4>
          <div className={styles.group}>
            <button className={styles.button}>Ingresar</button>
          </div>
        </form>
        <h4 style={{ marginTop: "4rem" }}>¿No tenés una cuenta? Registrate</h4>
      </div>
    </div>
  );
};

export default Login;
