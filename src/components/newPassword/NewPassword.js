"use client";
import React, { useState } from "react";
import styles from "../../app/general.module.scss";
import Link from "next/link";
import { userServiceNewPassword } from "../../services/user.service";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import EyeOpen from "../../../public/visibility_FILL0_wght400_GRAD0_opsz24.svg";
import EyeClose from "../../../public/visibility_off_FILL0_wght400_GRAD0_opsz24.svg";

const NewPassword = () => {
  const { token } = useParams();
  const [inputValue, setInputValue] = useState("");
  const navigate = useRouter();
  const [eye, setEye] = useState("password");
  const [eyeRepPassword, setEyeRepPassword] = useState("password");

  const [formData, setFormData] = useState({
    password: "",
    repPassword: "",
  });
  const handleEye = () => {
    if (eye === "password") setEye("text");
    else setEye("password");
  };

  const handleEyeRepPassword = () => {
    if (eyeRepPassword === "password") setEyeRepPassword("text");
    else setEyeRepPassword("password");
  };
  const [error, setError] = useState(null);
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

    if (!formData.password || !formData.repPassword) {
      setError("Por favor, complete todos los campos.");
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
    let temp = formData.password;
    userServiceNewPassword(temp, token).then(() => {
      console.log("???--->", formData);
      navigate.push("/login");
    });
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
            href="/forgot-password"
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
        <h1>Generar Nueva Contraseña</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <h2>Nueva Contraseña</h2>
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
                type={eye}
                style={{ width: "100%" }}
                className={styles.inputPassword}
              />
              {eye === "password" ? (
                <Image
                  className={styles.inputEye}
                  onClick={handleEye}
                  src={EyeClose}
                  alt="eyeClose"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  className={styles.inputEye}
                  onClick={handleEye}
                  src={EyeOpen}
                  alt="eyeOpen"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          <div className={styles.group}>
            <h2>Repetir Contraseña</h2>
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
                type={eyeRepPassword}
                style={{ width: "100%" }}
                className={styles.inputPassword}
              />
              {eyeRepPassword === "password" ? (
                <Image
                  className={styles.inputEye}
                  onClick={handleEyeRepPassword}
                  src={EyeClose}
                  alt="eyeClose"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  className={styles.inputEye}
                  onClick={handleEyeRepPassword}
                  src={EyeOpen}
                  alt="eyeOpen"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>

          <div className={styles.group}>
            {error && <p className="error-message">{error}</p>}
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
                className={styles.button}
                style={{
                  width: "40%",
                  marginTop: "12px",
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
