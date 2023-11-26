import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import Table from "../../commons/Table";
import {turnServiceGetByConfirmationAndBranchOffice} from "@/services/turn.service"
import { useSelector } from "react-redux";

const ReservesPanelOperator = () => {
  const user = useSelector((state) => state.user);
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    turnServiceGetByConfirmationAndBranchOffice(user.branchOfficeId).then((turns) => {
      setTurns(turns);
    });
  }, []);

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
        <Table type="OperatorReserves" elements={turns} />
      </div>
    </div>
  );
};

export default ReservesPanelOperator;
