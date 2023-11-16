"use client";
import React, { useState } from "react";
import styles from "../../app/login.module.scss";
import Link from "next/link";
import { userServiceRegister } from "../../services/user.service";
import { useRouter } from "next/navigation";

const Register = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    dni: 0,
    mail: "",
    password: "",
    repPassword: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (
      !formData.fullName ||
      !formData.dni ||
      !formData.mail ||
      !formData.password ||
      !formData.repPassword
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    if (formData.password !== formData.repPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    let temp = { ...formData };
    userServiceRegister(temp).then(() => navigate.push("/login"));
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
        </div>
        <h1>Crear Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.twoForm}>
            <div className={styles.group} style={{ marginRight: "8px" }}>
              <p>Nombre y Apellido</p>
              <input
                value={formData.fullname}
                name="fullname"
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div className={styles.group}>
              <p>DNI</p>
              <input
                value={formData.dni}
                name="dni"
                onChange={handleInputChange}
                type="number"
              />
            </div>
          </div>
          <div className={styles.group}>
            <p>Mail</p>
            <input
              value={formData.mail}
              name="mail"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className={styles.twoForm} style={{ marginBottom: "16px" }}>
            <div className={styles.group} style={{ marginRight: "8px" }}>
              <p>Contraseña</p>
              <input
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                type="password"
              />
            </div>
            <div className={styles.group}>
              <p>Repetir Contraseña</p>
              <input
                value={formData.repPassword}
                name="repPassword"
                onChange={handleInputChange}
                type="password"
              />
            </div>
          </div>
          <div
            className={styles.group}
            style={{
              backgroundColor: "#f5f5f5",
              marginBottom: "12px",
              color: "#6e6e6e",
              fontSize: "12px",
              padding: "16px, 20px, 16px, 20px",
              gap: "12px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                fontWeight: "500",
                gap: "12px",
              }}
            >
              La contraseña debe contener:
            </div>
            <hr
              style={{
                border: "1px solid #e1e1e1",
                width: "100%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>ABC Una letra mayúscula</p>
                <p>123 Un número</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Una letra minúscula</p>
                <p>*** Mínimo 8 caracteres</p>
              </div>
            </div>
          </div>

          <div className={styles.group}>
            <div
              style={{
                marginBottom: "8px",
              }}
            >
              {error && <p className="error-message">{error}</p>}
              <button
                type="submit"
                className={styles.button}
                style={{ width: "100%" }}
              >
                Registrarme
              </button>
            </div>
            <hr
              style={{
                border: "1px solid #ccc",
                width: "100%",
                margin: "8px 0",
              }}
            />
            <div
              style={{
                width: "100%",
                marginTop: "8px",
              }}
            >
              <Link style={{ textDecoration: "none" }} href="/login">
                <h4
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  ¿Ya tenes cuenta? Inicia sesion
                </h4>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
