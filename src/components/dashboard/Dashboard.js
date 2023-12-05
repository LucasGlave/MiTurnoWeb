"use client";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import { branchOfficeServiceAll } from "@/services/branchOffice.service";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";

const Dashboard = () => {
  // function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
  //   var switcherElement = document.createElement("div");
  //   switcherElement.classList.add("switcher");

  //   var intervalElements = items.map(function (item) {
  //     var itemEl = document.createElement("button");
  //     itemEl.innerText = item;
  //     itemEl.classList.add("switcher-item");
  //     itemEl.classList.toggle("switcher-active-item", item === activeItem);
  //     itemEl.addEventListener("click", function () {
  //       onItemClicked(item);
  //     });
  //     switcherElement.appendChild(itemEl);
  //     return itemEl;
  //   });

  //   function onItemClicked(item) {
  //     if (item === activeItem) {
  //       return;
  //     }

  //     intervalElements.forEach(function (element, index) {
  //       element.classList.toggle("switcher-active-item", items[index] === item);
  //     });

  //     activeItem = item;

  //     activeItemChangedCallback(item);
  //   }

  //   return switcherElement;
  // }

  // var switcherElement = createSimpleSwitcher(
  //   ["Dark", "Light"],
  //   "Dark",
  //   syncToTheme
  // );

  // var chartElement = document.createElement("div");

  // var chart = LightweightCharts.createChart(chartElement, {
  //   width: 600,
  //   height: 300,
  //   rightPriceScale: {
  //     borderVisible: false,
  //   },
  //   timeScale: {
  //     borderVisible: false,
  //   },
  // });

  // document.body.appendChild(chartElement);
  // document.body.appendChild(switcherElement);

  // var areaSeries = chart.addAreaSeries({
  //   topColor: "rgba(33, 150, 243, 0.56)",
  //   bottomColor: "rgba(33, 150, 243, 0.04)",
  //   lineColor: "rgba(33, 150, 243, 1)",
  //   lineWidth: 2,
  // });

  // const lightTheme = {
  //   chart: {
  //     layout: {
  //       background: {
  //         type: "solid",
  //         color: "#FFFFFF",
  //       },
  //       lineColor: "#2B2B43",
  //       textColor: "#191919",
  //     },
  //     watermark: {
  //       color: "rgba(0, 0, 0, 0)",
  //     },
  //     grid: {
  //       vertLines: {
  //         visible: false,
  //       },
  //       horzLines: {
  //         color: "#f0f3fa",
  //       },
  //     },
  //   },
  //   series: {
  //     topColor: "rgba(33, 150, 243, 0.56)",
  //     bottomColor: "rgba(33, 150, 243, 0.04)",
  //     lineColor: "rgba(33, 150, 243, 1)",
  //   },
  // };

  // var themesData = {
  //   Dark: darkTheme,
  //   Light: lightTheme,
  // };

  // function syncToTheme() {
  //   chart.applyOptions(Light.chart);
  //   areaSeries.applyOptions(Light.series);
  // }

  // areaSeries.setData([
  //   { time: "2018-10-19", value: 35.98 },
  //   { time: "2019-05-28", value: 42.75 },
  // ]);
  // syncToTheme();
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
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
              <div>
                <h3>{100}</h3>
                <h2>Total reservas</h2>
              </div>
              {/* <svg></svg> */}
            </div>
            <div className={styles.bottom}></div>
          </div>
          <div className={styles.data}>
            <div className={styles.info}>
              <div>
                <h3>{100}</h3>
                <h2>Total cancelaciones</h2>
              </div>
              {/* <svg></svg> */}
            </div>
            <div className={styles.bottom}></div>
          </div>
          <div className={styles.data}>
            <div className={styles.info}>
              <div>
                <h3>{100}</h3>
                <h2>Asistencias</h2>
              </div>
              {/* <svg></svg> */}
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
            style={{ width: "33.3%", height: "13.7rem", marginTop: "2.5rem" }}
          >
            <h3>Reservas vs Asistencias</h3>
            {/* select */}
            <div style={{ display: "flex" }}>
              {/* grafico torta */}
              {/* porcentaje c/u */}
            </div>
            <button className={styles.button}>Ver reporte</button>
          </div>
          <div
            className={styles.card}
            style={{ width: "66.6%", height: "13.7rem", marginTop: "2.5rem" }}
          >
            <h2>RESERVAS CANCELACIONES</h2>
            {/* grafico */}
          </div>
        </div>
        <div
          className={styles.card}
          style={{
            width: "95%",
            height: "10rem",
            marginTop: "1rem",
            alignItems: "flex-start",
          }}
        >
          <h3>Plazo de antelación de solicitud de las reservas</h3>
          <button
            className={styles.button}
            style={{
              width: "8rem",
              fontSize: "15px",
              height: "2.5rem",
              padding: "0",
              backgroundColor: "#9b9b9b",
            }}
          >
            Ultimos 6 meses
          </button>{" "}
          {/* dinamico del select de cake, en cursor default, sin handle */}
          <h2>Reservas con antelación</h2>
          {/* su completado */}
          <hr
            style={{
              display: "flex",
              alignItems: "flex-start",
              border: "0.3rem solid #a442f1",
              width: "100%",
              borderRadius: "15px",
            }}
          />
          <h2>Reservas sin antelación</h2>
          {/* su completado */}
          <hr
            style={{
              display: "flex",
              alignItems: "flex-start",
              border: "0.3rem solid red",
              width: "100%",
              borderRadius: "15px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
