import React from "react";
import { Roboto } from "next/font/google";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import HeaderOpeDetails from "../header/HeaderOperator";

const OpeDetails = () => {
  return (
    <div className={styles.container}>
      <Header isPosition={"operator"} />
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
          <div className={styles.twoForm}>
            <div className={styles.group} style={{ marginRight: "16px" }}>
              <p>DNI</p>
              <input type="text" />
            </div>

            <div className={styles.group}>
              <p>Sucursal</p>
              <select
                style={{
                  borderRadius: "8px",
                  border: "1px solid var(--Grey-3, #e1e1e1)",
                  background: "var(--White, #fff)",
                  display: "flex",
                  padding: "12px 8px 12px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                <option value="sucursal1">Sucursal 1</option>
                <option value="sucursal2">Sucursal 2</option>
                <option value="sucursal3">Sucursal 3</option>
              </select>
            </div>
          </div>
          <div className={styles.group}>
            <h2>Contraseña</h2>
            <input type="text" className="input-with-icon" />
          </div>
          <div style={{ width: "80%" }}>
            <h4>Editar Contraseña</h4>
          </div>
          <div className={styles.group}>
            <button className={styles.button}>Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpeDetails;
