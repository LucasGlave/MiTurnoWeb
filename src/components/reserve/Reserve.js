"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { Roboto } from "next/font/google";
import Swal from "sweetalert2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useRouter } from "next/navigation";
import {
  branchOfficeServiceAll,
  branchOfficeServiceGetDates,
} from "../../services/branchOffice.service";
import Steps from "./Steps";
import InputsReserve from "./formReserve";
import FormReserve from "./formReserve";
import { horaryServiceByDate } from "@/services/horary.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reserve = () => {
  const [isBranchOfficeSelected, setIsBranchOfficeSelected] = useState(false);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [branchOffices, setBranchOffices] = useState([]);
  const [branchOfficeId, setBranchOfficeId] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      if (timer === 3) {
        notify();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      window.location.reload();
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const leftSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(leftSeconds).padStart(
      2,
      "0"
    )}`;
  };

  const notify = () => toast.error("Se termino el tiempo!");

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const changeSelect = (e) => {
    if (e.target.value !== "placeholder") {
      branchOfficeServiceGetDates(e.target.value)
        .then((res) => setDisabledDates(res.data))
        .catch(() => {});
    }
    selectBranchOffice(e);
  };

  const isDateDisabled = (dateObject) => {
    const date = dateObject.$d;
    if (!date) false;

    const today = new Date();
    if (date < today || date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }
    return disabledDates.some(
      (disabledDate) =>
        date.toDateString() === new Date(disabledDate).toDateString()
    );
  };
  if (selectedDate != null && !isDaySelected) setIsDaySelected(true);

  useEffect(() => {
    if (!isBranchOfficeSelected) {
      setSelectedDate(null);
      setIsDaySelected(false);
    }
  }, [isBranchOfficeSelected]);

  useEffect(() => {
    branchOfficeServiceAll()
      .then((branchOffices) => {
        if (branchOffices) {
          setBranchOffices(branchOffices.data);
        }
      })
      .catch(() => {});
  }, []);

  const selectBranchOffice = (e) => {
    setBranchOfficeId(parseInt(e.target.value));
    if (e.target.value !== "placeholder") {
      setIsBranchOfficeSelected(true);
    } else {
      setIsBranchOfficeSelected(false);
    }
  };
  const functionForm = (boole) => {
    setIsFormComplete(boole);
  };
  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"client"} />
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
              <Steps
                isBranchOfficeSelected={isBranchOfficeSelected}
                isDaySelected={isDaySelected}
                isFormComplete={isFormComplete}
              />
            </div>
            <h2>Sucursal</h2>
            <select
              name="branchOffices"
              onChange={changeSelect}
              className={styles.dropdown}
            >
              <option value={"placeholder"}>Seleccione una sucursal</option>
              {branchOffices.map((branchOffice) => (
                <option key={branchOffice.id} value={branchOffice.id}>
                  {branchOffice.name}
                </option>
              ))}
            </select>
            {isBranchOfficeSelected && isDaySelected ? (
              <FormReserve
                functionForm={functionForm}
                isFormComplete={isFormComplete}
                date={selectedDate}
                branchOfficeId={branchOfficeId}
              />
            ) : (
              []
            )}
          </div>
          <div className={styles.calendario}>
            {isBranchOfficeSelected && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  disabled={!isBranchOfficeSelected}
                  value={selectedDate}
                  onChange={handleDateChange}
                  shouldDisableDate={isDateDisabled}
                />
              </LocalizationProvider>
            )}
          </div>
        </div>
        <div
          className="time"
          style={{
            display: "flex",
            width: "100%",
            marginTop: "10rem",
            placeContent: "space-between space-around",
            flexFlow: "column",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: "2rem",
          }}
        >
          <div className={styles.button}>{formatTime(timer)}</div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        theme="colored"
      />
    </div>
  );
};

export default Reserve;
