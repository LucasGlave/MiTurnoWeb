"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import { turnService } from "@/services/turn.service";
import { useParams } from "next/navigation";

const TableReserve = () => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {user
        ? turns.map((turn) => (
            <div
              key={turn.id}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                margin: "1rem 0 ",
              }}
              className={styles.card}
            >
              <div>
                <h2>Nombre y apellido</h2>
                <h3> {user.fullName} </h3>
              </div>
              <div>
                <h2>Reserva</h2>
                <h3>{`${turn.turn_date} - ${turn.horary_id}`}</h3>
              </div>
              <div>
                <h2>Sucursal</h2>
                {<h3>{turn.branch_office_id}</h3> /*poner nombre */}
              </div>
              <div>
                <h2>N° de la reserva</h2>
                <h3>{turn.id}</h3>
              </div>
              <div>
                <div className={styles.button}>Editar</div>
              </div>
            </div>
          ))
        : []}
    </div>
  );
};

export default TableReserve;
