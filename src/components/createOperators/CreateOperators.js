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
  const [eye1, setEye1] = useState("password");
  const [eye2, setEye2] = useState("password");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    dni: "",
    branch_office_id: "",
    password: "",
    rep_password: "",
  });

  useEffect(() => {
    getAllBranchOfficeService().then((branchOffices) => {
      setBranchOffices(branchOffices.data);
    });
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
    console.log(name, value);
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
    console.log(formData);
    e.preventDefault();
    setError(null);

    let temp = { ...formData };
    userServiceCreateOperators(temp).then(navigate.push("/operators-panel"));
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
              value={formData.full_name}
              name="full_name"
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
                name="branch_office_id"
                onChange={handleInputChange}
                value={formData.branch_office_id}
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
                {branchOffices.map((branch_office) => (
                  <option key={branch_office.id} value={branch_office.id}>
                    {branch_office.name}
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
                  value={formData.rep_password}
                  name="rep_password"
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
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOperators;
