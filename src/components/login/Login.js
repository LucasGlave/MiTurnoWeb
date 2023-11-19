"use client";
import React, { useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import Link from "next/link";
import { userServiceLogin } from "../../services/user.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EyeOpen from "../../../public/visibility_FILL0_wght400_GRAD0_opsz24.svg";
import EyeClose from "../../../public/visibility_off_FILL0_wght400_GRAD0_opsz24.svg";

const Login = () => {
  const navigate = useRouter();
  const [eye, setEye] = useState("password");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleEye = () => {
    if (eye === "password") setEye("text");
    else setEye("password");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!userData.email || !userData.password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    let temp = { ...userData };
    userServiceLogin(temp).then(() => navigate.push("/reserve"));
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
                type={eye}
                style={{ width: "100%" }}
                className={styles.innerInput}
              />
              {eye === "password" ? (
                <Image
                  className="image"
                  onClick={handleEye}
                  src={EyeClose}
                  alt="eyeClose"
                  width={20}
                  height={20}
                  style={{
                    transform: "translateX(-135%)",
                    zIndex: "1",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Image
                  className="image"
                  onClick={handleEye}
                  src={EyeOpen}
                  alt="eyeOpen"
                  width={20}
                  height={20}
                  style={{
                    transform: "translateX(-135%)",
                    zIndex: "1",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </div>
          <Link style={{ textDecoration: "none" }} href="/forgot-password">
            <h4>¿Olvidaste tu contraseña?</h4>
          </Link>

          <div className={styles.group}>
            <button type="submit" className={styles.button}>
              Ingresar
            </button>
          </div>
          <hr style={{ width: "80%", marginTop: "1.5rem" }} />
          <Link
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              width: "80%",
              marginTop: "1.25rem",
              alignSelf: "center",
              borderRadius: "8px",
              background: "rgba(164, 66, 241, 0.1)",
            }}
            href="/register"
          >
            <h4>¿No tenés una cuenta? Registrate</h4>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
