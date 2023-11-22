"use client";
import React, { useState } from "react";
import styles from "../../app/general.module.scss";
import Link from "next/link";
import { userServiceRegister } from "../../services/user.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EyeOpen from "../../assets/visibility_FILL0_wght400_GRAD0_opsz24.svg";
import EyeClose from "../../assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg";

const Register = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useRouter();
  const [eye1, setEye1] = useState("password");
  const [eye2, setEye2] = useState("password");
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    email: "",
    password: "",
    repPassword: "",
  });
  const handleEye1 = () => {
    if (eye1 === "password") setEye1("text");
    else setEye1("password");
  };
  const handleEye2 = () => {
    if (eye2 === "password") setEye2("text");
    else setEye2("password");
  };
  const [error, setError] = useState(null);
  const handleKeyDown = (event) => {
    if (
      !(
        event.key === "Backspace" ||
        event.key === "Delete" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) &&
      isNaN(Number(event.key))
    ) {
      event.preventDefault();
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (name === "password") setInputValue(e.target.value);
      return { ...prevState, [name]: value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const frontNames = {
      fullName: "Nombre y Apellido",
      dni: "DNI",
      email: "Email",
      password: "Contraseña",
      repPassword: "Repetir Contraseña",
    };

    const mustHave = ["fullName", "dni", "email", "password", "repPassword"];
    const missing = mustHave.filter((e) => !formData[e]);

    if (missing.length > 0) {
      const message = `Completar los campos ${missing
        .map((e) => ` ${frontNames[e]}`)
        .join(" y ")}.`;
      setError(message);
      return;
    }

    if (formData.password !== formData.repPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(formData.password)) {
      setError("La contraseña debe cumplir los requisitos.");
      return;
    }
    let temp = { ...formData };
    userServiceRegister(temp)
      .then(() => navigate.push("/login"))
      .catch((error) => console.error(error));
  };
  return (
    <div className={styles.container}>
      <div style={{ marginTop: "8rem" }} className={styles.card}>
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
                value={formData.fullName}
                name="fullName"
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
                onKeyDown={handleKeyDown}
                type="text"
              />
            </div>
          </div>
          <div className={styles.group}>
            <p>Mail</p>
            <input
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div
            className={styles.twoForm}
            style={{
              marginBottom: "16px",
              gap: 5,
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className={styles.group}
              style={{
                alignItems: "flex-start",
                display: "flex",
              }}
            >
              <p>Contraseña</p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #d7d7d7",
                  borderRadius: "10px",
                }}
              >
                <input
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                  type={eye1}
                  className={styles.inputPassword}
                />
                {eye1 === "password" ? (
                  <Image
                    src={EyeClose}
                    onClick={handleEye1}
                    className={styles.inputEye}
                    width={20}
                    height={20}
                    alt="eyeClose"
                  />
                ) : (
                  <Image
                    src={EyeOpen}
                    onClick={handleEye1}
                    className={styles.inputEye}
                    width={20}
                    height={20}
                    alt="eyeOpen"
                  />
                )}
              </div>
            </div>
            <div
              className={styles.group}
              style={{ alignItems: "flex-start", display: "flex" }}
            >
              <p>Repetir Contraseña</p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #d7d7d7",
                  borderRadius: "10px",
                }}
              >
                <input
                  value={formData.repPassword}
                  name="repPassword"
                  onChange={handleInputChange}
                  type={eye2}
                  className={styles.inputPassword}
                />
                {eye2 === "password" ? (
                  <Image
                    src={EyeClose}
                    onClick={handleEye2}
                    className={styles.inputEye}
                    width={20}
                    height={20}
                    alt="eyeClose"
                  />
                ) : (
                  <Image
                    src={EyeOpen}
                    onClick={handleEye2}
                    className={styles.inputEye}
                    width={20}
                    height={20}
                    alt="eyeOpen"
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className={styles.group}
            style={{
              backgroundColor: "#fff",
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
                <p
                  style={{
                    color: /[A-Z]/.test(inputValue)
                      ? "green"
                      : inputValue
                      ? "red"
                      : "gray",
                  }}
                >
                  ABC Una letra mayúscula
                </p>
                <p
                  style={{
                    color: /\d/.test(inputValue)
                      ? "green"
                      : inputValue
                      ? "red"
                      : "gray",
                  }}
                >
                  123 Un número
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    color: /[a-z]/.test(inputValue)
                      ? "green"
                      : inputValue
                      ? "red"
                      : "gray",
                  }}
                >
                  Una letra minúscula
                </p>
                <p
                  style={{
                    color:
                      inputValue.length >= 8
                        ? "green"
                        : inputValue
                        ? "red"
                        : "gray",
                  }}
                >
                  *** Mínimo 8 caracteres
                </p>
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
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    width: "100%",
                    height: "2.7rem",
                    marginTop: "0.25rem",
                    alignSelf: "center",
                    borderRadius: "8px",
                    background: "rgba(164, 66, 241, 0.1)",
                  }}
                >
                  ¿Ya tenés cuenta? Iniciá sesión
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
