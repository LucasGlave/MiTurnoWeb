import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "../../app/general.module.scss";
import Table from "../../commons/Table";
import { turnService } from "@/services/turn.service";
import { useParams } from "next/navigation";

const ReservesPanelClient = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    turnService(id).then((user) => {
      setUser(user);
      setTurns(user.turns);
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
        <Table type="ClientReserves" user={user} elements={turns} />
      </div>
    </div>
  );
};

export default ReservesPanelClient;
