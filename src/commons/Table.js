"use client";
import React, { useEffect, useState } from "react";
import styles from "../app/general.module.scss";

const Table = ({ type, user, elements }) => {
  const [labelName, setLabelName] = useState("Nombre");
  const [labelReserveOrEmail, setLabelReserveOrEmail] = useState("Reservas");
  const [
    labelReserveOrCapacityOrBranchOffice,
    setLabelReserveOrCapacityOrBranchOffice,
  ] = useState("Sucursal");
  const [
    labelNumberReserveOrHorarysOrPhoneNumber,
    setLabelNumberReserveOrHorarysOrPhoneNumber,
  ] = useState("Nº de la reserva");
  const [labelButton, setLabelButton] = useState("Editar");

  const parseTimeToHours = (timeString) => {
    const timeParts = timeString.split(":");
    const hours = parseInt(timeParts[0], 10); // Obtener las horas y convertirlas a número
    const minutes = parseInt(timeParts[1], 10); // Obtener los minutos y convertirlos a número
    const seconds = parseInt(timeParts[2], 10); // Obtener los segundos y convertirlos a número

    // Calcular la cantidad total de horas
    const totalHours = hours + minutes / 60 + seconds / 3600;
    return totalHours;
  };

  useEffect(() => {
    if (type === "ClientReserves") {
      setLabelName("Nombre y Apellido");
      setLabelButton("Cancelar");
    } else if (type === "AdminBranchOffices") {
      setLabelReserveOrEmail("Email");
      setLabelReserveOrCapacityOrBranchOffice("Capacidad máxima");
      setLabelNumberReserveOrHorarysOrPhoneNumber("Horario de Inicio y Cierre");
    } else if (type === "AdminOperators") {
      setLabelReserveOrEmail("Email");
      setLabelNumberReserveOrHorarysOrPhoneNumber("Teléfono");
    } else if(type === "OperatorReserves"){
      setLabelName("Nombre y Apellido");
      setLabelReserveOrEmail("Reserva")
      setLabelButton("Confirmación")
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            margin: "1rem 0 ",
          }}
          className={styles.card}
        >
          <div>
            <h2>{labelName}</h2>
            <h3>
              {user
                ? user.fullName
                : element.user.full_name
                ? element.user.full_name
                : element.full_name
                ? element.full_name
                : element.name
                ? element.name
                : element.fullName
                ? element.fullName
                : null}
            </h3>
          </div>
          <div>
            <h2>{labelReserveOrEmail}</h2>
            <h3>
              {element.email
                ? element.email
                : `${element.turn_date} - ${element.horary_id}`}
            </h3>
          </div>
          <div>
            <h2>{labelReserveOrCapacityOrBranchOffice}</h2>
            <h3>
              {element.boxes
                ? element.boxes *
                  (parseTimeToHours(element.closing_time) -
                    parseTimeToHours(element.opening_time))
                : element.reservation_date
                ? element.reservation_date
                : element.branchOffice.name
                ? element.branchOffice.name
              : null}
            </h3>
          </div>
          <div>
            <h2>{labelNumberReserveOrHorarysOrPhoneNumber}</h2>
            <h3>
              {element.opening_time
                ? `${element.opening_time} - ${element.closing_time}`
                : element.phone_number
                ? element.phone_number
                : element.id
                ? element.id
                : null}
            </h3>
          </div>
          <div>
            <div className={styles.button}>{labelButton}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
