"use client";
import React, { useState } from "react";
import styles from "../../app/general.module.scss";
import Swal from "sweetalert2";
import Link from "next/link";
import { userServiceForgotPassword } from "../../services/user.service";
import { useRouter } from "next/navigation";
import useInput from "@/hooks/useInput";

const ForgotPassword = () => {
  const navigate = useRouter();
  const input = useInput();
  const [error, setError] = useState(null);

  const sweetAlert = () => {
    Swal.fire({
      title: "Envio de email exitoso",
      text: "Revisa tu casilla de correo",
      icon: "info",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const email = input.value;

    if (!email) {
      setError("Por favor, llenar el campo Email.");
      return;
    }

    userServiceForgotPassword(email).catch((error) =>
      setError("Verificar la direccion de email")
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            href="/login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.5875 16.4209C10.912 16.0964 10.912 15.5703 10.5875 15.2459L6.17503 10.8334H16.6667C17.1269 10.8334 17.5 10.4603 17.5 10C17.5 9.53979 17.1269 9.1667 16.6667 9.1667H6.17503L10.5875 4.7542C10.912 4.42973 10.912 3.90367 10.5875 3.5792C10.2631 3.25473 9.737 3.25473 9.41253 3.5792L3.69881 9.29293C3.30828 9.68345 3.30828 10.3166 3.69881 10.7071L9.41253 16.4209C9.737 16.7453 10.2631 16.7453 10.5875 16.4209Z"
                fill="#A442F1"
              />
            </svg>

            <h4 className={styles.back}> Atras</h4>
          </Link>
        </div>
        <h1>Recuperar Contraseña</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <h2>Email</h2>
            <input
              {...input}
              type="email"
              style={{
                width: "90.5%",
              }}
            />
          </div>
          <div className={styles.group}>
            {error && (
              <p style={{ textAlign: "center" }} className="error-message">
                {error}
              </p>
            )}
            <div
              style={{
                marginBottom: "8px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                onClick={sweetAlert}
                className={styles.button}
                style={{
                  width: "40%",
                  marginTop: "12px",
                }}
              >
                Enviar
              </button>
            </div>
            <hr
              style={{
                border: "1px solid #ccc",
                width: "100%",
                margin: "8px 0",
              }}
            />
          </div>
        </form>
        <p
          style={{
            width: "75%",
            color: "#a442f1",
            fontSize: "12px",
          }}
        >
          Una vez ingresado tu Email te enviaremos un link para ingresar una
          contraseña nueva.{" "}
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
