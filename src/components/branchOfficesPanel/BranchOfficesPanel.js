import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import Table from "../../commons/Table";
import { getAllBranchOfficeService } from "@/services/branchOffice.service";

const BranchOfficesPanel = () => {
  const [branchOffices, setBranchOffices] = useState([]);

  useEffect(() => {
    getAllBranchOfficeService().then((branchOffices) => {
      setBranchOffices(branchOffices.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"admin"} color={"reserve-panel"} />

      <div style={{ width: "80%", marginTop: "2rem" }}>
        <h1>Sucursales</h1>
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          width: "80%",
          marginTop: "1rem",
        }}
      >
        <Table type="AdminBranchOffices" elements={branchOffices} />
      </div>
    </div>
  );
};

export default BranchOfficesPanel;
