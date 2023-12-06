"use client";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import { branchOfficeServiceAll } from "@/services/branchOffice.service";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import {
  turnServiceDashboardAdvance,
  turnServiceDashboardGeneral,
} from "@/services/turn.service";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

const Dashboard = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const [stateReserve, setStateReserve] = useState({});
  const [stateAdvance, setStateAdvance] = useState(null);
  useEffect(() => {
    if (branch) {
      turnServiceDashboardGeneral(branch).then((res) =>
        setStateReserve(res.data)
      );
      turnServiceDashboardAdvance(branch).then((res) =>
        setStateAdvance(res.data.advance_count)
      );
    }
  }, [branch]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dataLine = {
    labels,
    datasets: [
      {
        label: "Cancelaciones",
        data: [0, 1, 6, 3, 7, 2, 7, 3, 8, 1, 5, 3],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Reservas",
        data: [6, 4, 9, 2, 1, 0, 4, 7, 2, 1, 7, 1],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data = {
    labels: ["Ausentes", "Canceladas", "Confirmadas", "Pendientes"],
    datasets: [
      {
        data: [
          stateReserve.total_absence,
          stateReserve.total_cancelled,
          stateReserve.total_confirmed,
          stateReserve.total_pending,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "#a442f1",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const fakeData = {
    labels: ["Ausentes", "Canceladas", "Confirmadas", "Pendientes"],
    datasets: [
      {
        data: [1, 1, 1, 1],
        backgroundColor: ["rgb(177 177 177 / 52%)"],
        hoverOffset: 4,
      },
    ],
  };

  const changeSelect = (e) => {
    if (e.target.value != "placeholder") setBranch(e.target.value);
  };
  useEffect(() => {
    branchOfficeServiceAll().then((branchess) => {
      if (branchess) setBranches(branchess.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"admin"} color={"dashboard"} />
      <div className={styles.dashboard}>
        <div>
          <h2>Filtro por sucursal</h2>
          <FormControl
            sx={{ m: 2, width: 170, color: "#a442f1", borderColor: "#a442f1" }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Sucursal</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Seleccione sucursal"
              value={branch}
              onChange={changeSelect}
              className={styles.dropdown}
            >
              <MenuItem value="placeholder">Seleccione sucursal</MenuItem>
              {branches.map((branchOffice) => (
                <MenuItem key={branchOffice.id} value={branchOffice.id}>
                  {branchOffice.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={styles.datas}>
          <div className={styles.data}>
            <div className={styles.info}>
              <h2>Reservas:</h2>
              <h3>{stateReserve.total}</h3>
            </div>
            <div className={styles.bottom}></div>
          </div>
          <div className={styles.data}>
            <div className={styles.info}>
              <h2>Ausencias:</h2>
              <h3>{stateReserve.total_absence}</h3>
            </div>
            <div className={styles.bottom}></div>
          </div>
          <div className={styles.data}>
            <div className={styles.info}>
              <h2>Cancelaciones:</h2>
              <h3>{stateReserve.total_cancelled}</h3>
            </div>
            <div className={styles.bottom}></div>
          </div>
          <div className={styles.data}>
            <div className={styles.info}>
              <h2>Asistencias:</h2>
              <h3>{stateReserve.total_confirmed}</h3>
            </div>
            <div className={styles.bottom}></div>
          </div>
        </div>
        <div
          className={styles.datasBottom}
          style={{ justifyContent: "space-between" }}
        >
          <div
            className={styles.card}
            style={{ width: "50%", height: "13.7rem", marginTop: "2.5rem" }}
          >
            <div style={{ display: "flex" }}>
              {branch ? (
                <Doughnut
                  data={data}
                  style={{
                    width: 261,
                    height: 261,
                    display: "flex",
                    flexDirection: "row",
                  }}
                />
              ) : (
                <Doughnut
                  data={fakeData}
                  style={{
                    width: 261,
                    height: 261,
                    display: "flex",
                    flexDirection: "row",
                  }}
                />
              )}
            </div>
          </div>
          <div
            className={styles.card}
            style={{ width: "50%", height: "13.7rem", marginTop: "2.5rem" }}
          >
            {/* <h2>RESERVAS CANCELACIONES</h2> */}
            <Line options={options} data={dataLine} />
          </div>
        </div>
        <div
          className={styles.card}
          style={{
            width: "95%",
            height: "12rem",
            marginTop: "1rem",
            alignItems: "flex-start",
          }}
        >
          <h3>Plazo de antelación de solicitud de las reservas</h3>
          <h2>Reservas con antelación</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {branch ? (
              <>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    border: "0.3rem solid #a442f1",
                    width: `${
                      ((stateReserve.total - stateAdvance) * 100) /
                      stateReserve.total
                    }%`,
                    borderRadius: "15px",
                    transition: "width 0.5s ease-in-out",
                  }}
                />
                <h3>{`${
                  ((stateReserve.total - stateAdvance) * 100) /
                  stateReserve.total
                }%`}</h3>
              </>
            ) : (
              <p
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  border: "0.3rem solid rgb(177 177 177 / 52%)",
                  width: "50%",
                  borderRadius: "15px",
                  transition: "width 0.5s ease-in-out",
                }}
              />
            )}
          </div>
          <h2>Reservas sin antelación</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {branch ? (
              <>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    border: "0.3rem solid rgb(255, 99, 132)",
                    width: `${(stateAdvance * 100) / stateReserve.total}%`,
                    borderRadius: "15px",
                    transition: "width 0.5s ease-in-out",
                  }}
                />
                <h3>{`${(stateAdvance * 100) / stateReserve.total}%`}</h3>
              </>
            ) : (
              <p
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  border: "0.3rem solid rgb(177 177 177 / 52%)",
                  width: "50%",
                  borderRadius: "15px",
                  transition: "width 0.5s ease-in-out",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
