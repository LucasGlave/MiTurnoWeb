"use client";
import React from "react";
import styles from "../../app/general.module.scss";
import Link from "next/link";
import { userServiceConfirmation } from "@/services/user.service";
import { useParams } from "next/navigation";

const ConfirmEmail = () => {
  const { token } = useParams();
  userServiceConfirmation(token).catch((err) => {});

  return (
    <div
      className={styles.container}
      style={{
        justifyContent: "center",
      }}
    >
      <div
        className={styles.card}
        style={{
          margin: "0 auto",
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
        <h1 style={{ color: "#a442f1" }}>¡Gracias por confirmar tu cuenta!</h1>
        <p style={{ textAlign: "center" }}>
          Ahora puedes iniciar sesión en nuestra página y comenzar a reservar
          tus turnos
        </p>
        <Link
          className={styles.button}
          style={{
            textDecoration: "none",
          }}
          href="/login"
        >
          Haz click acá para iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmail;
