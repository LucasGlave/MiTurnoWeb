"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import {
  userServiceClient,
  userServiceGetSingle,
} from "@/services/user.service";
import { branchOfficeServiceAll } from "@/services/branchOffice.service";

const EditOperator = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [operator, setOperator] = useState({
    full_name: "",
    dni: "",
    email: "",
    phone_number: "",
    branch_office_id: "",
  });
  const [branchOffices, setBranchOffices] = useState([]);
  const [formData, setFormData] = useState({
    full_name: operator.full_name,
    dni: operator.dni,
    email: operator.email,
    phone_number: operator.phone_number,
    branch_office_id: operator.branch_office_id,
  });

  useEffect(() => {
    userServiceGetSingle(id).then((operator) => {
      setOperator(operator);
      setFormData(operator);
      branchOfficeServiceAll().then((branchOffices) => {
        setBranchOffices(branchOffices.data);
      });
    });
  }, []);

  const handleBack = () => {
    navigate.back();
  };

  const sweetEdit = () => {
    Swal.fire({
      title: "Cambios guardados con exito",
      icon: "success",
    }).then(() => navigate.push("/operators-panel"));
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
      full_name: "Nombre y apellido",
      dni: "Dni",
      email: "Email",
      phone_number: "Número de teléfono",
      branch_office_id: "Sucursal",
    };

    const mustHave = [
      "full_name",
      "dni",
      "email",
      "phone_number",
      "branch_office_id",
    ];
    const missing = mustHave.filter((e) => !formData[e]);

    if (missing.length > 0) {
      const message = `Completar los campos ${missing
        .map((e) => ` ${frontNames[e]}`)
        .join(" y ")}.`;
      setError(message);
      return;
    }
    if (formData.branch_office_id === "Seleccione una sucursal...") {
      setError("Elija una sucursal válida!");
      return;
    }
    const id = operator.id;
    let temp = {
      dni: operator.dni,
      full_name: operator.full_name,
      phone_number: operator.phone_number,
      branch_office_id: operator.branch_office_id,
    };
    userServiceClient(temp, id).then(() => sweetEdit());
  };

  return (
    <div className={styles.container}>
      <Header isPosition="admin" isLoggedIn={true} />
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
          <h4
            style={{ cursor: "pointer" }}
            onClick={handleBack}
            className={styles.back}
          >
            Atras
          </h4>
        </div>
        <div style={{ width: "80%" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Datos Operador
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <h2>Nombre y Apellido</h2>
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
              disabled
              type="email"
            />
          </div>
          <div className={styles.group}>
            <h2>Teléfono</h2>
            <input
              value={formData.phone_number}
              name="phone_number"
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
                style={{ marginBottom: "20px" }}
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
                  marginBottom: "20px",
                }}
              >
                <option key={0} value={null}>
                  Seleccione una sucursal...
                </option>
                {branchOffices.map((branch_office) => (
                  <option key={branch_office.id} value={branch_office.id}>
                    {branch_office.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.group}>
            {error && <p className="error-message">{error}</p>}
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

export default EditOperator;
