import React from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { Checkbox } from "@mui/material";

function Cancelations() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.card} style={{ width: "90%", marginTop: "3rem" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <div className={styles.group} style={{ width: "60%" }}>
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10.5875 16.4209C10.912 16.0964 10.912 15.5703 10.5875 15.2459L6.17503 10.8334H16.6667C17.1269 10.8334 17.5 10.4603 17.5 10C17.5 9.53979 17.1269 9.1667 16.6667 9.1667H6.17503L10.5875 4.7542C10.912 4.42973 10.912 3.90367 10.5875 3.5792C10.2631 3.25473 9.737 3.25473 9.41253 3.5792L3.69881 9.29293C3.30828 9.68345 3.30828 10.3166 3.69881 10.7071L9.41253 16.4209C9.737 16.7453 10.2631 16.7453 10.5875 16.4209Z"
                  fill="#A442F1"
                />
              </svg>
              <h4 className={styles.back}> Atras</h4>
            </div>
            <h1 style={{ marginTop: "0px", marginBottom: "3rem" }}>
              Cancelar Reserva
            </h1>

            <p>Hola {"nombre"},</p>
            <h3>¿Por que desea cancelar su reserva?</h3>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox />
              <h2>Ya no quiero ir</h2>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox />
              <h2>Me equivoque de horario</h2>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox />
              <h2>Encontre un lugar mejor</h2>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox />
              <h2>Me cancelaron</h2>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox />
              <h2>Otro</h2>
            </div>
          </div>

          <div
            className={styles.group}
            style={{ width: "30%", marginTop: "3rem" }}
          >
            <p>informacion de la reserva</p>
            <h2>Ivan Cruce</h2>
            <hr />
            <p>Dia: {"dia.de.turno"}</p>
            <p>Horario: {"Horario.de.turno"}</p>
            <p>Sucursal: {"Sucursal"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancelations;
