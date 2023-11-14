import React from "react";
import { Roboto } from "next/font/google";
import styles from "../../app/login.module.scss";
import Header from "../header/Header";
import HeaderOpeDetails from "../header/HeaderOpeDetails";

const OpeDetails = () => {
  return (
    <div className={styles.container}>
      <HeaderOpeDetails />
      <div className={styles.card}>
        <div style={{ width: "80%" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Mis datos
          </h1>
        </div>
        <form>
          <div className={styles.group}>
            <h2>Nombre</h2>
            <input type="text" />
          </div>
          <div className={styles.group}>
            <h2>Correo electrónico</h2>
            <input type="text" />
          </div>
          <div className="twoForm">
            <div className="group" style={{ marginRight: "8px" }}>
              <p>Nombre y Apellido</p>
              <input type="text" placeholder="Nombre y Apellido" />
            </div>
            <div className="group">
              <p>DNI</p>
              <input type="text" placeholder="DNI" />
            </div>
          </div>
          <div className={styles.group}>
            <h2>Contraseña</h2>
            <input type="text" className="input-with-icon" />
          </div>
          <h4>Editar Contraseña</h4>
          <div className={styles.group}>
            <button className={styles.button}>Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpeDetails;
