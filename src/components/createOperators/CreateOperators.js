"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import EyeOpen from "../../assets/visibility_FILL0_wght400_GRAD0_opsz24.svg";
import EyeClose from "../../assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg";
import { userServiceCreateOperators } from "@/services/user.service";
import { getAllBranchOfficeService } from "@/services/branchOffice.service";

const CreateOperators = () => {
  const navigate = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const [branchOffices, setBranchOffices] = useState([]);
  const [branchOfficeId, setBranchOfficeId] = useState(null);
  const [isBranchOfficeSelected, setIsBranchOfficeSelected] = useState(false);
  const [eye1, setEye1] = useState("password");
  const [eye2, setEye2] = useState("password");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dni: "",
    phoneNumber: "",
    branchOfficeId: "",
    password: "",
    repPassword: "",
  });

  useEffect(() => {
    getAllBranchOfficeService()
      .then((branchOffices) => {
        setBranchOffices(branchOffices.data);
      })
      .then(() => console.log(branchOffices));
  }, []);

  const handleEye1 = () => {
    if (eye1 === "password") setEye1("text");
    else setEye1("password");
  };
  const handleEye2 = () => {
    if (eye2 === "password") setEye2("text");
    else setEye2("password");
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

    const frontNames = {
      fullName: "Nombre y Apellido",
      dni: "DNI",
      email: "Email",
      phoneNumber: "Teléfono",
      password: "Contraseña",
      repPassword: "Repetir Contraseña",
    };

    const mustHave = [
      "fullName",
      "dni",
      "email",
      "phoneNumber",
      "password",
      "repPassword",
    ];
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
    userServiceCreateOperators(temp)
      .then(() => navigate.push("/operators-panel"))
      .catch((err) => {
        if (err.response.status === 409) setError("Este email ya existe.");
        else setError("Error al intentar registrar operador.");
      });
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
            Creacion de operadores
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
            <h2>Teléfono</h2>
            <input
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              type="text"
            />
          </div>
          <div className={styles.twoForm}>
            <div className={styles.group} style={{ marginRight: "16px" }}>
              <p>DNI</p>
              <input
                value={formData.dni}
                name="dni"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                type="text"
              />
            </div>

            <div className={styles.group}>
              <p>Sucursal</p>
              <select
                name="branchOfficeId"
                onChange={handleInputChange}
                className={styles.dropdown}
                value={formData.branchOfficeId}
                style={{
                  borderRadius: "8px",
                  border: "1px solid var(--Grey-3, #e1e1e1)",
                  background: "var(--White, #fff)",
                  display: "flex",
                  padding: "12px 8px 12px 12px",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                <option value={null}>Seleccione una sucursal...</option>
                {branchOffices.map((branchOffice) => (
                  <option key={branchOffice.id} value={branchOffice.id}>
                    {branchOffice.name}
                  </option>
                ))}
              </select>
            </div>
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
                Enviar
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
            ></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOperators;
