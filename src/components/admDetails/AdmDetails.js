import React, { useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { userServiceAdmin } from "@/services/user.service";
import { useRouter } from "next/navigation";

const AdmDetails = () => {
  const navigate = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    email: "",
    password: "",
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
    // if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(formData.password)) {
    //   setError("La contraseña debe cumplir los requisitos.");
    //   return;
    // }
    let temp = { ...formData };
    userServiceAdmin(temp).then(() => navigate.push("/login"));
  };

  return (
    <div className={styles.container}>
      <Header
        isLoggedIn={true}
        isCreatBranch={true}
        isBranch={true}
        isBranches={true}
        isOperator={true}
        isReports={true}
        isProfile={true}
      />
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
            />
          </div>

          <div className={styles.group} style={{ marginBottom: "18px" }}>
            <h2>Contraseña</h2>
            <input
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              type="text"
              className="input-with-icon"
            />
          </div>
          {/* <div style={{ width: "80%" }}>
            <h4>Editar Contraseña</h4>
          </div> */}
          <div className={styles.group}>
            <button className={styles.button}>Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmDetails;
