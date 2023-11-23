import React from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import TableReserve from "./TableReserve";

const ReservePanel = () => {
  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"client"} color={"reserve-panel"} />

      <div style={{ width: "80%", marginTop: "2rem" }}>
        <h1>Reservas</h1>
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          width: "80%",
          marginTop: "1rem",
        }}
      >
        <TableReserve />
      </div>
    </div>
  );
};

export default ReservePanel;
