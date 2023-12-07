"use client";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import { branchOfficeServiceAll } from "@/services/branchOffice.service";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import {
  turnServiceDashboardAdvance,
  turnServiceDashboardByTime,
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
  plugins,
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
  const [stateYear, setStateYear] = useState({});
  const [arrayDataset, setArrayDataset] = useState([]);
  const [advancePercentage, setAdvancePercentage] = useState(null);
  const [notAdvancePercentage, setNotAdvancePercentage] = useState(null);
  const [checked, setChecked] = useState({
    cancelled: true,
    absence: true,
    confirmed: true,
    pending: true,
    total: true,
  });
  const [cancelled, setCancelled] = useState({
    label: "Cancelaciones",
    data: [],
    borderColor: "#3da5e6",
    backgroundColor: "#3da5e6",
  });
  const [confirmed, setConfirmed] = useState({
    label: "Confirmadas",
    data: [],
    borderColor: "#feca66",
    backgroundColor: "#feca66",
  });
  const [pending, setPending] = useState({
    label: "Pendientes",
    data: [],
    borderColor: "#a243eb",
    backgroundColor: "#a243eb",
  });
  const [absence, setAbsence] = useState({
    label: "Ausencias",
    data: [],
    borderColor: "#fc5886",
    backgroundColor: "#fc5886",
  });
  const [total, setTotal] = useState({
    label: "Total",
    data: [],
    borderColor: "#36b035",
    backgroundColor: "#36b035",
  });
  const setter = {
    pending: (count, i) =>
      setPending((prevState) => {
        let temp = prevState.data;
        temp[i] = count;
        return { ...prevState, data: temp };
      }),
    absence: (count, i) =>
      setAbsence((prevState) => {
        let temp = prevState.data;
        temp[i] = count;
        return { ...prevState, data: temp };
      }),
    total: (count, i) =>
      setTotal((prevState) => {
        let temp = prevState.data;
        temp[i] = count;
        return { ...prevState, data: temp };
      }),
    cancelled: (count, i) =>
      setCancelled((prevState) => {
        let temp = prevState.data;
        temp[i] = count;
        return { ...prevState, data: temp };
      }),
    confirmed: (count, i) =>
      setConfirmed((prevState) => {
        let temp = prevState.data;
        temp[i] = count;
        return { ...prevState, data: temp };
      }),
  };
  useEffect(() => {
    Object.entries(stateYear).map((month) => {
      let mes = month[0];
      let obj = month[1];
      Object.entries(obj).map((statusArr) => {
        let status = statusArr[0];
        let count = statusArr[1];
        setter[status](count, mes);
      });
    });
  }, [stateYear]);
  const getter = {
    pending,
    absence,
    total,
    cancelled,
    confirmed,
  };
  useEffect(() => {
    const arr = [];
    Object.entries(checked).map((statusArr) => {
      let status = statusArr[0];
      let check = statusArr[1];
      if (check) arr.push(getter[status]);
      else {
        let temp = { ...getter[status] };
        temp.data = [];
        arr.push(temp);
      }
    });
    setArrayDataset(arr);
  }, [checked]);
  useEffect(() => {
    if (branch) {
      turnServiceDashboardGeneral(branch).then((res) =>
        setStateReserve(res.data)
      );
      turnServiceDashboardAdvance(branch).then((res) =>
        setStateAdvance(res.data.advance_count)
      );
      turnServiceDashboardByTime(branch).then((res) => setStateYear(res.data));
    }
  }, [branch]);
  useEffect(() => {
    setAdvancePercentage(
      ((stateReserve.total - stateAdvance) * 100) / stateReserve.total
    );
    setNotAdvancePercentage((stateAdvance * 100) / stateReserve.total);
  }, [stateAdvance, stateReserve]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
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

  const changeCheckbox = (e) => {
    const { name } = e.target;
    const check = e.target.checked;
    setChecked((prevState) => {
      return { ...prevState, [name]: check };
    });
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
          <div
            className={styles.data}
            style={{
              background: "-webkit-linear-gradient(top, #feca66 , #aa863f)",
            }}
          >
            <h2>Asistencias:</h2>
            <h3>{stateReserve.total_confirmed}</h3>
          </div>
          <div
            className={styles.data}
            style={{
              background:
                "-webkit-linear-gradient(top, #4BC0C0 , rgb(13 108 80))",
            }}
          >
            <h2>Total:</h2>
            <h3>{stateReserve.total}</h3>
          </div>
          <div
            className={styles.data}
            style={{
              background:
                "-webkit-linear-gradient(top, #3da5e6 , rgb(61 32 169))",
            }}
          >
            <h2>Cancelaciones:</h2>
            <h3>{stateReserve.total_cancelled}</h3>
          </div>
          <div
            className={styles.data}
            style={{
              background:
                "-webkit-linear-gradient(top, #a243eb , rgb(71 19 130))",
            }}
          >
            <h2>Pendientes:</h2>
            <h3>{stateReserve.total_pending}</h3>
          </div>
          <div
            className={styles.data}
            style={{
              background:
                "-webkit-linear-gradient(top, #fc5886 , rgb(149 25 90))",
            }}
          >
            <h2>Ausencias:</h2>
            <h3>{stateReserve.total_absence}</h3>
          </div>
        </div>
        <div
          className={styles.datasBottom}
          style={{ justifyContent: "space-between" }}
        >
          <div
            className={styles.card}
            style={{ width: "50%", height: "29rem", marginTop: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                height: "80%",
                padding: 30,
              }}
            >
              {branch && stateReserve.total ? (
                <Doughnut
                  data={data}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          boxWidth: 100,
                          boxHeight: 20,
                          useBorderRadius: true,
                          borderRadius: 15,
                          padding: 5,
                        },
                      },
                    },
                  }}
                  style={{
                    width: 400,
                    height: 430,
                    display: "flex",
                    flexDirection: "row",
                  }}
                />
              ) : (
                <Doughnut
                  data={fakeData}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          boxWidth: 100,
                          boxHeight: 20,
                          useBorderRadius: true,
                          borderRadius: 15,
                          padding: 5,
                        },
                      },
                    },
                  }}
                  style={{
                    width: 400,
                    height: 430,
                    display: "flex",
                    flexDirection: "row",
                  }}
                />
              )}
            </div>
          </div>
          <div
            className={styles.card}
            style={{
              width: "60%",
              height: "29rem",
              marginTop: "1rem",
              flexDirection: "row",
            }}
          >
            <FormGroup>
              <FormControlLabel
                style={{ padding: 0 }}
                control={
                  <Checkbox
                    name={"cancelled"}
                    checked={checked.cancelled}
                    onChange={changeCheckbox}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 22 },
                      color: "#3da5e6",
                      "&.Mui-checked": {
                        color: "#3da5e6",
                      },
                    }}
                    style={{ padding: 0 }}
                  />
                }
              />
              <FormControlLabel
                style={{ padding: 0 }}
                control={
                  <Checkbox
                    name={"absence"}
                    checked={checked.absence}
                    onChange={changeCheckbox}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 22 },
                      color: "#fc5886",
                      "&.Mui-checked": {
                        color: "#fc5886",
                      },
                    }}
                    style={{ padding: 0 }}
                  />
                }
              />
              <FormControlLabel
                style={{ padding: 0 }}
                control={
                  <Checkbox
                    name={"confirmed"}
                    checked={checked.confirmed}
                    onChange={changeCheckbox}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 22 },
                      color: "#feca66",
                      "&.Mui-checked": {
                        color: "#feca66",
                      },
                    }}
                    style={{ padding: 0 }}
                  />
                }
              />
              <FormControlLabel
                style={{ padding: 0 }}
                control={
                  <Checkbox
                    name={"pending"}
                    checked={checked.pending}
                    onChange={changeCheckbox}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 22 },
                      color: "#a243eb",
                      "&.Mui-checked": {
                        color: "#a243eb",
                      },
                    }}
                    style={{ padding: 0 }}
                  />
                }
              />
              <FormControlLabel
                style={{ padding: 0 }}
                control={
                  <Checkbox
                    name={"total"}
                    checked={checked.total}
                    onChange={changeCheckbox}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 22 },
                      color: "#36b035",
                      "&.Mui-checked": {
                        color: "#36b035",
                      },
                    }}
                    style={{ padding: 0 }}
                  />
                }
              />
            </FormGroup>
            <Line options={options} data={{ labels, datasets: arrayDataset }} />
          </div>
        </div>
        <div
          className={styles.card}
          style={{
            width: "95%",
            height: "12rem",
            marginTop: "1rem",
            alignItems: "flex-start",
            marginBottom: "3rem",
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
            {branch && stateReserve.total ? (
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
                {advancePercentage === 100 ? (
                  <h3>{advancePercentage}%</h3>
                ) : (
                  <h3>{advancePercentage.toString().slice(0, 2)}%</h3>
                )}
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
            {branch && stateReserve.total ? (
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
                {notAdvancePercentage === 100 ? (
                  <h3>{notAdvancePercentage}%</h3>
                ) : (
                  <h3>{notAdvancePercentage.toString().slice(0, 2)}%</h3>
                )}
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
