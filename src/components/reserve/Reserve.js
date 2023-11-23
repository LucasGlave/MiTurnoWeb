"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { Roboto } from "next/font/google";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { reserveServiceGetAllBranchOffices } from "../../services/reserve.service";

const Reserve = () => {
  const user = useSelector((state) => state.user);
  const navigate = useRouter();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isBranchOfficeSelected, setIsBranchOfficeSelected] = useState(false);
  const [branchOffices, setBranchOffices] = useState([]);
  const [branchOfficeId, setBranchOfficeId] = useState(null);
  /*   const [formData, setFormData] = useState({
    branchOffice: null,
  }); */

  useEffect(() => {
    reserveServiceGetAllBranchOffices()
      .then((branchOffices) => {
        setBranchOffices(branchOffices.data);
      })
      .then(() => console.log(branchOffices));
  }, []);

  const selectBranchOffice = (e) => {
    setBranchOfficeId(e.target.value);
    if (e.target.value !== "Seleccione una sucursal...") {
      setIsBranchOfficeSelected(true);
    } else {
      setIsBranchOfficeSelected(false);
    }
  };
  const sweetReserve = () => {
    Swal.fire({
      title: "Turno reservado con éxito",
      text: "Gracias por confiar en nuestro servicio",
      icon: "success",
    });
    navigate.push("/reserve/id");
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
      <Header isLoggedIn={true} />
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
                <p
                  className={
                    isBranchOfficeSelected ? styles.pVerde : styles.pVioleta
                  }
                />
                <div
                  className={
                    isBranchOfficeSelected
                      ? styles.circuloVerde
                      : styles.circulo
                  }
                >
                  2
                </div>
                <p
                  className={
                    isBranchOfficeSelected ? styles.pVerde : styles.pVioleta
                  }
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
                  className={
                    isBranchOfficeSelected ? styles.pVioleta : styles.pGris
                  }
                />
                <div
                  className={
                    isBranchOfficeSelected ? styles.circulo : styles.circuloGris
                  }
                >
                  3
                </div>
                <p
                  className={
                    isBranchOfficeSelected ? styles.pVioleta : styles.pGris
                  }
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
              <h3 style={{ color: "#a442f1", marginLeft: "2.6rem" }}>
                Seleccioná el día
              </h3>
              <h3 style={{ color: "#a442f1", marginLeft: "1rem" }}>
                Completá el formulario
              </h3>
            </div>
            <h2>Sucursal</h2>

            <select
              name="branchOffices"
              onChange={selectBranchOffice}
              className={styles.dropdown}
            >
              <option value={null}>Seleccione una sucursal...</option>
              {branchOffices.map((branchOffice) => (
                <option key={branchOffice.id} value={branchOffice.id}>
                  {branchOffice.name}
                </option>
              ))}
            </select>

            <div className={styles.group}>
              <button
                onClick={sweetReserve}
                className={styles.button}
                style={{
                  marginTop: "2rem",
                  pointerEvents: isButtonEnabled ? "auto" : "none",
                  opacity: isButtonEnabled ? "1" : "0.5",
                }}
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
