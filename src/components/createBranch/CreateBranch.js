"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import { useRouter } from "next/navigation";
import { horaryServiceAll } from "@/services/horary.service";
import { branchOfficeServiceCreate } from "@/services/branchOffice.service";
import Header from "../header/Header";
import Swal from "sweetalert2";

const CreateBranch = () => {
  const navigate = useRouter();
  // const [inputValue, setInputValue] = useState("");
  const [horaries, setHoraries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    boxes: 1,
    email: "",
    opening_time: "",
    closing_time: "",
  });
  const [error, setError] = useState(null);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
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

  useEffect(() => {
    horaryServiceAll()
      .then((res) => setHoraries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBack = () => {
    navigate.back();
  };

  const sweetReserve = () => {
    Swal.fire({
      position: "top",
      title: "Sucursal creada con éxito",
      text: "Gracias por confiar en nuestro servicio",
      icon: "success",
    })
    .then(()=>navigate.push("/branch-offices-panel"))
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
    let temp = { ...formData };
    branchOfficeServiceCreate(temp)
      .then(() => sweetReserve())
      .catch((error) => console.error(error));
  };
  return (
    <div className={styles.container}>
      <Header isPosition={"admin"} />

      <div style={{ marginTop: "4rem", width: "60%" }} className={styles.card}>
        <div
          style={{
            width: "95%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            onClick={handleBack}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
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
            <h4 className={styles.back}> Atras</h4>
          </div>
        </div>
        <div style={{ width: "80%" }}>
          <h1>Crear una nueva sucursal</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.group}>
            <p>Nombre</p>
            <input
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className={styles.group}>
            <p>Correo electrónico</p>
            <input
              value={formData.email}
              name="email"
              onChange={handleInputChange}
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
                value={formData.closing_time}
                onChange={handleInputChange}
                name="closing_time"
                style={
                  !arrayFilter.length
                    ? {
                        cursor: "not-allowed",
                        borderRadius: "8px",
                        border: "1px solid var(--Grey-3, #e1e1e1)",
                        background: "var(--White, #fff)",
                        display: "flex",
                        padding: "12px 8px 12px 12px",
                        alignSelf: "stretch",
                      }
                    : {
                        borderRadius: "8px",
                        border: "1px solid var(--Grey-3, #e1e1e1)",
                        background: "var(--White, #fff)",
                        display: "flex",
                        padding: "12px 8px 12px 12px",
                        alignItems: "center",
                        gap: "8px",
                        alignSelf: "stretch",
                      }
                }
                disabled={!arrayFilter.length && true}
              >
                <option>Selecciona un horario</option>
                {arrayFilter.map((horary, i) => (
                  <option key={i} value={horary.id}>
                    {horary.id.slice(0, 5)}
                  </option>
                ))}
              </select>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBranch;
