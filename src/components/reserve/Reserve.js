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

const Reserve = () => {
  const [isBranchOfficeSelected, setIsBranchOfficeSelected] = useState(false);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [branchOffices, setBranchOffices] = useState([]);
  const [branchOfficeId, setBranchOfficeId] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
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
    if (date < today) {
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
