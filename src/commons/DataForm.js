"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userServiceClient } from "@/services/user.service";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import styles from "../app/general.module.scss";
import Header from "../components/header/Header";
import {
  branchOfficeServiceAll,
  branchOfficeServiceGetSingle,
  getAllBranchOfficesService,
} from "@/services/branchOffice.service";

const DataForm = ({ type, color }) => {
  //type=client,operator,admin
  const navigate = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const [branchOffices, setBranchOffices] = useState([]);
  const [formData, setFormData] = useState({
    full_name: user.full_name,
    dni: user.dni,
    email: user.email,
    phone_number: user.phone_number,
    branch_office_id: user.branch_office_id,
    branch_office_name: "",
  });

  useEffect(() => {
    if (formData.branch_office_id) {
      branchOfficeServiceGetSingle(formData.branch_office_id).then(
        (branchOffice) => {
          setBranchOffices(branchOffice.data);
          setFormData((prevState) => {
            return {
              ...prevState,
              branch_office_name: branchOffice.data.name,
            };
          });
        }
      );
    }
  }, [formData]);

  const sweetEdit = () => {
    Swal.fire({
      title: "Cambios guardados con exito",
      icon: "success",
    }).then(() => {
      if (type === "operator") {
        navigate.push("/reserves-panel-operator");
      } else if (type === "admin") {
        navigate.push("/branch-offices-panel");
      } else {
        navigate.push(`/reserves-panel-client/${user.id}`);
      }
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

    const frontNames = {
      full_name: "Nombre y apellido",
      dni: "Dni",
      email: "Email",
      phone_number: "Número de teléfono",
    };

    const mustHave = ["full_name", "dni", "email", "phone_number"];
    const missing = mustHave.filter((e) => !formData[e]);

    if (missing.length > 0) {
      const message = `Completar los campos ${missing
        .map((e) => ` ${frontNames[e]}`)
        .join(" y ")}.`;
      setError(message);
      return;
    }
    if (
      type === "operator" &&
      formData.branch_office_id === "Seleccione una sucursal..."
    ) {
      setError("Elija una sucursal válida!");
      return;
    }
    const id = user.id;
    let temp = {
      dni: formData.dni,
      full_name: formData.full_name,
      phone_number: formData.phone_number,
      branch_office_id: formData.branch_office_id,
    };
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
                <input
                  value={formData.branch_office_name}
                  name="branch_office_name"
                  onChange={handleInputChange}
                  disabled
                  type="text"
                  style={{
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                />
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

export default DataForm;
