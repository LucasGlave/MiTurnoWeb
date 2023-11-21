import React from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import TableReserve from "./TableReserve";

const ReservePanel = () => {
  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} />
      <div style={{ width: "80%" }}>
        <h1>Reservas</h1>
      </div>
      <div
        style={{
          width: "80%",
          marginTop: "3rem",
        }}
      >
        <TableReserve />
      </div>
    </div>
  );
};

export default ReservePanel;
