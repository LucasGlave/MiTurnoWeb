"use client";
import React, { useState } from "react";
import styles from "../../app/login.module.scss";
import Header from "../header/Header";
import Link from "next/link";
import { userServiceLogin } from "../../services/user.service";
import { useRouter } from "next/navigation";

const Login = () => {
  const navigate = useRouter();
  const [eye, setEye] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!userData.email || !userData.password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    let temp = { ...userData };
    userServiceLogin(temp).then(() => navigate.push("/register"));
    console.log(userData);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.card}>
        <h1>Iniciar sesión</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <h2>Email</h2>
            <input
              value={userData.email}
              name="email"
              onChange={handleInputChange}
              type="text"
              style={{
                width: "90.5%",
              }}
            />
          </div>
          <div className={styles.group}>
            <h2>Contraseña</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <input
                value={userData.password}
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
          <h4>¿Olvidaste tu contraseña?</h4>
          <div className={styles.group}>
            <button type="submit" className={styles.button}>
              Ingresar
            </button>
          </div>
        </form>
        <Link style={{ textDecoration: "none" }} href="/register">
          <h4 style={{ marginTop: "4rem" }}>
            ¿No tenés una cuenta? Registrate
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default Login;
