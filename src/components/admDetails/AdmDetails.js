import React, { useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { userServiceClient } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AdmDetails = () => {
  const navigate = useRouter();
  const user = useSelector((state) => state.user);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    dni: user.dni,
    email: user.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      setInputValue(e.target.value);
      return { ...prevState, [name]: value };
    });
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const id = user.id;
    let temp = { ...formData };
    userServiceClient(temp, id).then(() => navigate.push("/adm-details"));
  };

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"admin"} />
      <div className={styles.card}>
        <div style={{ width: "80%" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Mis datos
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <h2>Nombre</h2>
            <input
              value={formData.fullName}
              name="fullName"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className={styles.group}>
            <h2>Email</h2>
            <input
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              type="email"
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
              style={{ marginBottom: "20px" }}
            />
          </div>

          <div className={styles.group}>
            <button className={styles.button} type="submit">
              Guardar cambios
            </button>
          </div>

          <hr
            style={{
              marginTop: "20px",
              width: "80%",
              border: " 1px solid lightgrey",
            }}
          />

          <div className={styles.group}>
            <button
              type="submit"
              className={styles.button}
              style={{
                marginTop: "15px",
                width: "100%",
                backgroundColor: "rgba(164, 66, 241, 0.1)",
                color: "#a442f1",
              }}
            >
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmDetails;
