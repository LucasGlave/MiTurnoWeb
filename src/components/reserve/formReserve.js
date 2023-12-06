"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Swal from "sweetalert2";
import { horaryServiceByDate } from "@/services/horary.service";
import { turnServiceCreate } from "@/services/turn.service";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const FormReserve = ({
  functionForm,
  isFormComplete,
  date,
  branchOfficeId,
}) => {
  const navigate = useRouter();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [horaries, setHoraries] = useState([]);
  const [availability, setAvailability] = useState("");
  const [userData, setUserData] = useState({
    horary_id: "placeholder",
    full_name: "",
    phone_number: "",
    branch_office_id: branchOfficeId,
    turn_date: date,
    // email: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  useEffect(() => {
    if (
      userData.horary_id !== "placeholder" &&
      userData.full_name &&
      userData.phone_number
      // userData.email
    ) {
      functionForm(true);
    } else {
      functionForm(false);
    }
  }, [userData]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !userData.full_name ||
      !userData.phone_number ||
      // !userData.email ||
      !userData.horary_id
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    turnServiceCreate(userData, user.id)
      .then((res) => res.data)
      .then((turn) => navigate.push(`reserve/${turn.id}`))
      .catch((err) => {
        if (err.response.status === 409) {
          Swal.fire({
            title: "No puede sacar más de 3 turnos para la misma fecha.",
            text: "Seleccione una fecha válida.",
            icon: "warning",
            confirmButtonColor: "#7066e0",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              window.location.reload();
            }
          });
        }
      });
  };
  const sweetReserve = () => {
    Swal.fire({
      title: "Turno reservado con éxito",
      text: "Gracias por confiar en nuestro servicio",
      icon: "success",
    });
    navigate.push("/reserve/id");
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
  useEffect(() => {
    horaryServiceByDate(date, branchOfficeId).then((horaries) => {
      horaries.data.pop(1);
      if (horaries.data.length <= 3) {
        if (horaries.data.length === 1)
          setAvailability(`Último turno para este día!`);
        else
          setAvailability(
            `Últimos ${horaries.data.length} turnos para este día!`
          );
      }
      setHoraries(horaries.data);
    });
  }, [branchOfficeId]);
  return (
    <div style={{ width: "100%" }}>
      <form style={{ alignItems: "flex-start" }}>
        <div className={styles.group} style={{ width: "100%" }}>
          <h2>Horario</h2>
          <select
            name="horary_id"
            onChange={handleInputChange}
            className={styles.dropdown}
          >
            <option value={"placeholder"}>Seleccione un horario</option>
            {horaries.map((horary, i) => (
              <option key={i} value={horary.id}>
                {horary.id.slice(0, 5)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.twoForm} style={{ width: "100%", gap: "1rem" }}>
          <div className={styles.group} style={{ width: "50%" }}>
            <h2>Nombre y apellido</h2>
            <input
              value={userData.full_name}
              name="full_name"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.group} style={{ width: "50%" }}>
            <h2>Télefono</h2>
            <input
              value={userData.phone_number}
              name="phone_number"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {/* <h2>Mail</h2>
        <div className={styles.group} style={{ width: "100%" }}>
          <input
            value={userData.email}
            name="email"
            onChange={handleInputChange}
          />
        </div> */}
      </form>
      {availability && <p>{availability}</p>}
      <div style={{ marginTop: "2rem" }}>
        <button
          type="submit"
          onClick={onSubmit}
          className={styles.button}
          style={
            !isFormComplete
              ? { cursor: "not-allowed", backgroundColor: "#9b9b9ba3" }
              : {}
          }
          disabled={!isFormComplete}
        >
          Confirmar reserva
        </button>
      </div>
    </div>
  );
};

export default FormReserve;
