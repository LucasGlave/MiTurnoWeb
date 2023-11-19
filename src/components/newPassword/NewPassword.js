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
  const [formData, setFormData] = useState({
    password: "",
    repPassword: "",
  });
  const handleEye = () => {
    if (eye === "password") setEye("text");
    else setEye("password");
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
              }}
            >
              <input
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                type="password"
                style={{ width: "100%" }}
                className={styles.innerInput}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.6215 7.76855C8.22014 6.61431 10.0894 5.99968 12 6C13.9106 5.99968 15.7799 6.61431 17.3785 7.76855C18.9771 8.92279 20.2357 10.5665 21 12.4981C20.2363 14.4305 18.9779 16.0749 17.3792 17.2299C15.7805 18.3848 13.911 19 12 19C10.089 19 8.21949 18.3848 6.6208 17.2299C5.02212 16.0749 3.76375 14.4305 3 12.4981C3.76426 10.5665 5.02285 8.92279 6.6215 7.76855ZM7.58206 16.1912C8.914 17.0824 10.4422 17.5532 12 17.5522C13.5578 17.5532 15.086 17.0824 16.4179 16.1912C17.7499 15.3 18.8345 14.0225 19.5535 12.4981C18.8357 10.9718 17.7517 9.69221 16.4197 8.79911C15.0876 7.90601 13.5588 7.43369 12 7.43369C10.4412 7.43369 8.91237 7.90601 7.58034 8.79911C6.24831 9.69221 5.16427 10.9718 4.44655 12.4981C5.16554 14.0225 6.25012 15.3 7.58206 16.1912ZM13.6997 12.5C13.6997 13.4389 12.9385 14.2 11.9997 14.2C11.0608 14.2 10.2997 13.4389 10.2997 12.5C10.2997 11.5611 11.0608 10.8 11.9997 10.8C12.9385 10.8 13.6997 11.5611 13.6997 12.5ZM11.9997 15.5C13.6565 15.5 14.9997 14.1568 14.9997 12.5C14.9997 10.8431 13.6565 9.49999 11.9997 9.49999C10.3428 9.49999 8.99965 10.8431 8.99965 12.5C8.99965 14.1568 10.3428 15.5 11.9997 15.5Z"
                  fill="black"
                />
              </svg>
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
              }}
            >
              <input
                value={formData.repPassword}
                name="repPassword"
                onChange={handleInputChange}
                type="password"
                style={{ width: "100%" }}
                className={styles.innerInput}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.6215 7.76855C8.22014 6.61431 10.0894 5.99968 12 6C13.9106 5.99968 15.7799 6.61431 17.3785 7.76855C18.9771 8.92279 20.2357 10.5665 21 12.4981C20.2363 14.4305 18.9779 16.0749 17.3792 17.2299C15.7805 18.3848 13.911 19 12 19C10.089 19 8.21949 18.3848 6.6208 17.2299C5.02212 16.0749 3.76375 14.4305 3 12.4981C3.76426 10.5665 5.02285 8.92279 6.6215 7.76855ZM7.58206 16.1912C8.914 17.0824 10.4422 17.5532 12 17.5522C13.5578 17.5532 15.086 17.0824 16.4179 16.1912C17.7499 15.3 18.8345 14.0225 19.5535 12.4981C18.8357 10.9718 17.7517 9.69221 16.4197 8.79911C15.0876 7.90601 13.5588 7.43369 12 7.43369C10.4412 7.43369 8.91237 7.90601 7.58034 8.79911C6.24831 9.69221 5.16427 10.9718 4.44655 12.4981C5.16554 14.0225 6.25012 15.3 7.58206 16.1912ZM13.6997 12.5C13.6997 13.4389 12.9385 14.2 11.9997 14.2C11.0608 14.2 10.2997 13.4389 10.2997 12.5C10.2997 11.5611 11.0608 10.8 11.9997 10.8C12.9385 10.8 13.6997 11.5611 13.6997 12.5ZM11.9997 15.5C13.6565 15.5 14.9997 14.1568 14.9997 12.5C14.9997 10.8431 13.6565 9.49999 11.9997 9.49999C10.3428 9.49999 8.99965 10.8431 8.99965 12.5C8.99965 14.1568 10.3428 15.5 11.9997 15.5Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          <div className={styles.group}>
            <div
              style={{
                marginBottom: "8px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* {error && <p className="error-message">{error}</p>} */}
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
