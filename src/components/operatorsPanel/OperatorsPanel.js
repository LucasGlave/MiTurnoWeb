import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import Table from "../../commons/Table";
import { userServiceGetAllOperators } from "@/services/user.service";

const OperatorsPanel = () => {
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    userServiceGetAllOperators().then((operatorsResult) => {
      setOperators(operatorsResult.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"admin"} color={"reserve-panel"} />

      <div style={{ width: "80%", marginTop: "2rem" }}>
        <h1>Operadores</h1>
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          width: "80%",
          marginTop: "1rem",
        }}
      >
        <Table type="AdminOperators" elements={operators} />
      </div>
    </div>
  );
};

export default OperatorsPanel;
