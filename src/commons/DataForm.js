"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { userServiceClient } from "@/services/user.service";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import styles from "../app/general.module.scss";
import Header from "../components/header/Header";

const DataForm = ({ type, color }) => {
  //type=client,operator,admin
  const navigate = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    dni: user.dni,
    email: user.email,
  });

  const sweetEdit = () => {
    Swal.fire({
      title: "Cambios guardados con exito",
      icon: "success",
    });
  };

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
    let temp = { dni: formData.dni, full_name: formData.fullName };
    userServiceClient(temp, id).then(() => sweetEdit());
  };

  return (
    <div className={styles.container}>
      <Header isPosition={type} isLoggedIn={true} color={color} />
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
              disabled
              type="email"
            />
          </div>

          {type === "operator" ? (
            <div className={styles.twoForm}>
              <div className={styles.group} style={{ marginRight: "16px" }}>
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
                <p>Sucursal</p>
                <select
                  style={{
                    borderRadius: "8px",
                    border: "1px solid var(--Grey-3, #e1e1e1)",
                    background: "var(--White, #fff)",
                    display: "flex",
                    padding: "12px 8px 12px 12px",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    marginBottom: "20px",
                  }}
                >
                  <option value="sucursal1">Sucursal 1</option>
                  <option value="sucursal2">Sucursal 2</option>
                  <option value="sucursal3">Sucursal 3</option>
                </select>
              </div>
            </div>
          ) : (
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
          )}

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

export default DataForm;
