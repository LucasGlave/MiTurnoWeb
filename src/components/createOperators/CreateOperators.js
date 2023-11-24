import React from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
const CreateOperators = () => {
  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"admin"} />
      <div className={styles.card}>
        <div style={{ width: "80%" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Creacion de operadores
          </h1>
        </div>
        <form></form>
      </div>
    </div>
  );
};

export default CreateOperators;
