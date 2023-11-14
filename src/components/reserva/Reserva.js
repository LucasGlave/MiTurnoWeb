"use client";
import React from "react";
import styles from "../../app/login.module.scss";
import Header from "../header/Header";
import { Roboto } from "next/font/google";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

const Reserva = () => {
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
                <p
                  style={{
                    height: "2px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    background: "var(--Principal, #A442F1)",
                  }}
                />
                <div className={styles.circulo}>1</div>
                <p
                  style={{
                    height: "2px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    background: "var(--Principal, #A442F1)",
                  }}
                />
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
                <p
                  style={{
                    height: "2px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    background: "var(--Principal, #A442F1)",
                  }}
                />
                <div className={styles.circulo}>2</div>
                <p
                  style={{
                    height: "2px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    background: "var(--Principal, #A442F1)",
                  }}
                />
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
                <p
                  style={{
                    height: "2px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    background: "var(--Principal, #A442F1)",
                  }}
                />
                <div className={styles.circulo}>3</div>
                <p
                  style={{
                    height: "2px",
                    flex: "1 0 0",
                    borderRadius: "8px",
                    background: "var(--Principal, #A442F1)",
                  }}
                />
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
              <h3 style={{ color: "#a442f1", marginLeft: "2.2rem" }}>
                Seleccioná el día
              </h3>
              <h3 style={{ color: "#a442f1", marginLeft: "1rem" }}>
                Completá el formulario
              </h3>
            </div>
            <h2>Sucursal</h2>
            <input type="text" className={styles.dropdown}></input>
            <div className={styles.group}>
              <button className={styles.button} style={{ marginTop: "2rem" }}>
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

export default Reserva;
