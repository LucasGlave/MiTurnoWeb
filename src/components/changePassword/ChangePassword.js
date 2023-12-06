"use client";
import React, { useState } from "react";
import styles from "../../app/general.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EyeOpen from "../../assets/visibility_FILL0_wght400_GRAD0_opsz24.svg";
import EyeClose from "../../assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg";
import { userServiceChangePassword } from "@/services/user.service";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const navigate = useRouter();
  const [eyeOldPassword, setEyeOldPassword] = useState("password");
  const [eyeNewPassword, setEyeNewPassword] = useState("password");
  const [eyeRepPassword, setEyeRepPassword] = useState("password");
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    rep_new_password: "",
  });
  const handleEyeOldPassword = () => {
    if (eyeOldPassword === "password") setEyeOldPassword("text");
    else setEyeOldPassword("password");
  };
  const handleEyeNewPassword = () => {
    if (eyeNewPassword === "password") setEyeNewPassword("text");
    else setEyeNewPassword("password");
  };

  const handleEyeRepPassword = () => {
    if (eyeRepPassword === "password") setEyeRepPassword("text");
    else setEyeRepPassword("password");
  };
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleBack = () => {
    navigate.back();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.new_password || !formData.rep_new_password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    if (formData.new_password !== formData.rep_new_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(formData.new_password)
    ) {
      setError("La contraseña debe cumplir los requisitos.");
      return;
    }
    userServiceChangePassword(formData, user.id)
      .then(() => {
        Swal.fire({
          title: "Contraseña cambiada con éxito!",
          icon: "success",
        }).then(() => {
          navigate.back();
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("La contraseña anterior es incorrecta.");
        } else {
          console.error(err);
        }
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
          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={handleBack}
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
            <h4 style={{ cursor: "pointer" }} className={styles.back}>
              Atras
            </h4>
          </div>
        </div>
        <h1>Cambiar Contraseña</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <h2>Contraseña Anterior</h2>
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
                value={formData.old_password}
                name="old_password"
                onChange={handleInputChange}
                type={eyeOldPassword}
                style={{ width: "100%" }}
                className={styles.inputPassword}
              />
              {eyeOldPassword === "password" ? (
                <Image
                  className={styles.inputEye}
                  onClick={handleEyeOldPassword}
                  src={EyeClose}
                  alt="eyeClose"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  className={styles.inputEye}
                  onClick={handleEyeOldPassword}
                  src={EyeOpen}
                  alt="eyeOpen"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
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
                value={formData.new_password}
                name="new_password"
                onChange={handleInputChange}
                type={eyeNewPassword}
                style={{ width: "100%" }}
                className={styles.inputPassword}
              />
              {eyeNewPassword === "password" ? (
                <Image
                  className={styles.inputEye}
                  onClick={handleEyeNewPassword}
                  src={EyeClose}
                  alt="eyeClose"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  className={styles.inputEye}
                  onClick={handleEyeNewPassword}
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
                value={formData.rep_new_password}
                name="rep_new_password"
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
                  marginTop: "2rem",
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

export default ChangePassword;
