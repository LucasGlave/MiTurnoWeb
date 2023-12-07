"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import styles from "../../app/general.module.scss";
import { useParams } from "next/navigation";
import {
  branchOfficeServiceEdit,
  branchOfficeServiceGetSingle,
} from "@/services/branchOffice.service";
import { horaryServiceAll } from "@/services/horary.service";
import Header from "../header/Header";

const BranchOfficeDetails = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [branchOffice, setBranchOffice] = useState({});
  const [horaries, setHoraries] = useState([]);
  const [formData, setFormData] = useState({
    name: branchOffice.name,
    phone_number: branchOffice.phone_number,
    boxes: branchOffice.boxes,
    email: branchOffice.email,
    opening_time: branchOffice.opening_time,
    closing_time: branchOffice.closing_time,
  });

  useEffect(() => {
    branchOfficeServiceGetSingle(id).then((branchOffice) => {
      setBranchOffice(branchOffice.data);
      setFormData(branchOffice.data);
    });
    horaryServiceAll()
      .then((res) => setHoraries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const sweetEdit = () => {
    Swal.fire({
      title: "Cambios guardados con exito",
      icon: "success",
    }).then(() => navigate.push("/branch-offices-panel"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      setInputValue(e.target.value);
      return { ...prevState, [name]: value };
    });
  };

  const [openingTime, setOpeningTime] = useState("");
  const [arrayFilter, setArrayFilter] = useState([]);

  const changeSelect = (e) => {
    const selected = e.target.value;
    setOpeningTime(selected);
    handleInputChange(e);
  };

  useEffect(() => {
    const filterMin = horaries.filter((horary) => {
      const hour = parseInt(horary.id.slice(0, 5).replace(":", ""));
      const openingHour = parseInt(openingTime.replace(":", ""));
      return hour > openingHour;
    });
    setArrayFilter(filterMin);
  }, [openingTime]);

  const handleBack = () => {
    navigate.back();
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
      name: "Nombre",
      boxes: "Capacidad máxima",
      email: "Email",
      phone_number: "Número de teléfono",
      opening_time: "Horario de inicio",
      closing_time: "Horario de cierre",
    };

    const mustHave = [
      "name",
      "boxes",
      "email",
      "phone_number",
      "opening_time",
      "closing_time",
    ];
    const missing = mustHave.filter((e) => !formData[e]);

    if (missing.length > 0) {
      const message = `Completar los campos ${missing
        .map((e) => ` ${frontNames[e]}`)
        .join(" y ")}.`;
      setError(message);
      return;
    }
    const id = branchOffice.id;
    let temp = {
      name: formData.name,
      phone_number: formData.phone_number,
      boxes: formData.boxes,
      email: formData.email,
      opening_time: formData.opening_time,
      closing_time: formData.closing_time,
    };
    branchOfficeServiceEdit(id, temp)
      .then(() => {
        sweetEdit();
      })
      .catch((err) => {
        if (err.response.data === "Name branch office already exists") {
          setError("Ya se encuentra registrada una sucursal con ese nombre.");
        } else setError("Error al intentar registrarse.");
      });
  };

  return (
    <div className={styles.container}>
      <Header isPosition={"admin"} isLoggedIn={true} />
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
            Datos Sucursal
          </h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <h2>Nombre</h2>
            <input
              value={formData.name}
              name="name"
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
          <div className={styles.twoForm}>
            <div className={styles.group} style={{ marginRight: "8px" }}>
              <p>Telefono</p>
              <input
                value={formData.phone_number}
                name="phone_number"
                onChange={handleInputChange}
                onClick={handleKeyDown}
                type="text"
              />
            </div>
            <div className={styles.group}>
              <p>Capacidad máxima</p>
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
                }}
                value={formData.boxes}
                onChange={handleInputChange}
                name="boxes"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>
          <div
            className={styles.twoForm}
            style={{
              marginBottom: "36px",
            }}
          >
            <div className={styles.group} style={{ marginRight: "8px" }}>
              <p>Horario de Inicio</p>
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
                }}
                onChange={changeSelect}
                value={formData.opening_time}
                name="opening_time"
              >
                <option>Selecciona un horario</option>
                {horaries.map((horary, i) => (
                  <option key={i} value={horary.id}>
                    {horary.id.slice(0, 5)}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.group}>
              <p>Horario de Cierre</p>
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
                }}
                onChange={changeSelect}
                value={formData.closing_time}
                name="closing_time"
              >
                <option>Selecciona un horario</option>
                {horaries.map((horary, i) => (
                  <option key={i} value={horary.id}>
                    {horary.id.slice(0, 5)}
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
        </form>
      </div>
    </div>
  );
};

export default BranchOfficeDetails;
