import React from "react";
import Header from "../header/Header";
import styles from "../../app/login.module.scss";
import TableReserve from "./TableReserve";

const ReservePanel = () => {
  return (
    <div className={styles.container}>
      <Header />
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
