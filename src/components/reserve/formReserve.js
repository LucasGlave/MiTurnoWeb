"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Swal from "sweetalert2";
import {
  horaryServiceAll,
  horaryServiceByDate,
} from "@/services/horary.service";

const FormReserve = ({
  functionForm,
  isFormComplete,
  date,
  branchOfficeId,
}) => {
  const [error, setError] = useState(null);
  const [horaries, setHoraries] = useState([]);
  const [userData, setUserData] = useState({
    horary: "",
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  useEffect(() => {
    if (
      // userData.horary &&
      userData.fullName &&
      userData.phoneNumber &&
      userData.email
    ) {
      functionForm(true);
    } else {
      functionForm(false);
    }
  }, [userData]);
  const onSubmit = (e) => {
    e.preventDefault();
    // if (!userData.email || !userData.password) {
    //   setError("Por favor, complete todos los campos.");
    //   return;
    // }
    let temp = { ...userData };
    // mandar a url "reserve/:turnId" que en realidad es unicamente id
  };
  const sweetReserve = () => {
    Swal.fire({
      title: "Turno reservado con éxito",
      text: "Gracias por confiar en nuestro servicio",
      icon: "success",
    });
    navigate.push("/reserve/id");
  };
  const sweetModified = () => {
    Swal.fire({
      title: "Turno modificado con éxito",
      text: "Gracias por confiar en nuestro servicio",
      icon: "success",
    });
  };
  const sweetError = () => {
    Swal.fire({
      title: "No se pudo realizar el cambio",
      text: "Este turno ya fue ocupado, vuelve a intentarlo más tarde o modificando algún parámetro",
      icon: "error",
    });
  };
  useEffect(() => {
    horaryServiceByDate(date, branchOfficeId).then((horaries) => {
      horaries.data.pop(1);
      setHoraries(horaries.data);
    });
  }, [branchOfficeId]);
  return (
    <div style={{ width: "100%" }}>
      <form style={{ alignItems: "flex-start" }}>
        <div className={styles.group} style={{ width: "100%" }}>
          <h2>Horario</h2>
          <select name="branchOffices" className={styles.dropdown}>
            <option value={null}>Seleccione un horario</option>
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
              value={userData.fullName}
              name="fullName"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.group} style={{ width: "50%" }}>
            <h2>Télefono</h2>
            <input
              value={userData.phoneNumber}
              name="phoneNumber"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <h2>Mail</h2>
        <div className={styles.group} style={{ width: "100%" }}>
          <input
            value={userData.email}
            name="email"
            onChange={handleInputChange}
          />
        </div>
      </form>
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
