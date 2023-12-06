"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import Link from "next/link";
import { useSelector } from "react-redux";
import { turnServiceById } from "@/services/turn.service";
import { useParams } from "next/navigation";
const ReserveSuccess = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [turn, setTurn] = useState({
    id: "",
    reservation_time: "",
    horary_id: "",
    branch_office: { name: "" },
  });
  useEffect(() => {
    turnServiceById(id).then((turn) => setTurn(turn));
  }, []);

  return (
    <div className={styles.container}>
      <Header isPosition={"client"} isLoggedIn={true} />
      <div
        style={{
          width: "44rem",
          height: "29rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 7H36C38.7614 7 41 9.23858 41 12V36C41 38.7614 38.7614 41 36 41H12C9.23858 41 7 38.7614 7 36V12C7 9.23858 9.23858 7 12 7ZM4 12C4 7.58172 7.58172 4 12 4H36C40.4183 4 44 7.58172 44 12V36C44 40.4183 40.4183 44 36 44H12C7.58172 44 4 40.4183 4 36V12ZM32.7148 17.629L22.5 27.8438L16.7852 22.129C16.3947 21.7385 15.7615 21.7385 15.371 22.129L14.629 22.871C14.2385 23.2615 14.2385 23.8947 14.629 24.2852L21.4219 31.0781L21.8088 31.4482C22.1954 31.818 22.8046 31.818 23.1912 31.4482L23.5781 31.0781L34.871 19.7852C35.2615 19.3947 35.2615 18.7615 34.871 18.371L34.129 17.629C33.7385 17.2385 33.1053 17.2385 32.7148 17.629Z"
            fill="#CC6AFF"
          />
        </svg>
        <h1 style={{ color: "#a442f1" }}>¡Gracias por tu reserva!</h1>
        <p style={{ textAlign: "center" }}>
          En hasta 5 minutos, recibirás un correo electrónico en {user.email}{" "}
          con todos los detalles de tu reserva. Recordá revisar tu buzón de
          correo no deseado o promociones.
        </p>
        <button
          className={styles.button}
          onClick={() => {
            return window.print();
          }}
        >
          ¿Quéres imprimir tu comprobante?
        </button>
      </div>
      <hr
        style={{ width: "83.1%", margin: "-28px 0 3rem 0", color: "#c6c6c6" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginLeft: "10rem",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "1rem",
              }}
            >
              <h1>Reserva</h1>
              <h1 style={{ color: "#a442f1" }}>#{turn.id}</h1>
            </div>
            <p>
              Tramitada el {turn.reservation_date} a las{" "}
              {turn.reservation_time.slice(0, 5)} para el {turn.turn_date} a las{" "}
              {turn.horary_id.slice(0, 5)} hs.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "3rem",
            }}
          >
            <div>
              <h3>Cliente</h3>
              <h2>Nombre: {turn.full_name}</h2>
              <h2>Mail: {user.email}</h2>
              <h2>Teléfono: {turn.phone_number}</h2>
            </div>
            <div>
              <h3>Reserva</h3>
              <h2>Sucursal: {turn.branch_office.name}</h2>
              <h2>Día: {turn.turn_date}</h2>
              <h2>Horario: {turn.horary_id.slice(0, 5)}</h2>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: "10rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2px",
              color: "#E53939",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                backgroundColor: "rgb(229, 57, 57)",
                color: "white",
                padding: "10px 15px",
                borderRadius: "5px",
              }}
              href={`/cancelations/${turn.id}`}
            >
              <h2>Cancelar reserva</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveSuccess;
