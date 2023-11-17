"use client";
import React from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { Roboto } from "next/font/google";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

const Reserve = () => {
  const sweetReserve = () => {
    Swal.fire({
      title: "Turno reservado con éxito",
      text: "Gracias por confiar en nuestro servicio",
      icon: "success",
    });
  };
  const sweetModified = () => {
    Swal.fire({
      title: "Turno modificado con éxito",
      text: "Gracias por confiar en nuestro servicio",
      icon: "success",
    });
  };
  const sweetError = () => {
    Swal.fire({
      title: "No se pudo realizar el cambio",
      text: "Este turno ya fue ocupado, vuelve a intentarlo más tarde o modificando algún parámetro",
      icon: "error",
    });
  };
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardContainer}>
        <div className={styles.cardTop}>
          <h1>Hacer una reserva</h1>
        </div>
        <div className={styles.cardBottom}>
          <div className={styles.reserva}>
            <h3>Reserva</h3>
            <h2>Seleccioná tu sucursal</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p className={styles.pVerde} />
                <div className={styles.circuloVerde}>1</div>
                <p className={styles.pVerde} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p className={styles.pVioleta} />
                <div className={styles.circulo}>2</div>
                <p className={styles.pVioleta} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p className={styles.pGris} />
                <div className={styles.circuloGris}>3</div>
                <p className={styles.pGris} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <h3 style={{ color: "#a442f1", marginLeft: "1.2rem" }}>
                Elegí tu sucursal
              </h3>
              <h3 style={{ color: "#a442f1", marginLeft: "2.6rem" }}>
                Seleccioná el día
              </h3>
              <h3 style={{ color: "#a442f1", marginLeft: "1rem" }}>
                Completá el formulario
              </h3>
            </div>
            <h2>Sucursal</h2>
            <input type="text" className={styles.dropdown}></input>
            <div className={styles.group}>
              <button
                onClick={sweetReserve}
                className={styles.button}
                style={{ marginTop: "2rem" }}
              >
                Confirmar reserva
              </button>
            </div>
          </div>
          <div className={styles.calendario}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "StaticTimePicker"]}>
                <DemoItem>
                  <StaticTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div
          className="time"
          style={{
            display: "flex",
            width: "100%",
            marginTop: "5rem",
            placeContent: "space-between space-around",
            flexFlow: "column",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: "2rem",
          }}
        >
          <div className={styles.button}>04:45</div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
