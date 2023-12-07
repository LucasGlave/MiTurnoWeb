"use client";
import React, { useEffect, useState } from "react";
import styles from "../app/general.module.scss";
import Header from "@/components/header/Header";
import { useSelector } from "react-redux";
import { Pagination, Stack } from "@mui/material";

const Table = ({ type, onExecute, onDelete, color }) => {
  //type = AdminBranchOffices || AdminOperators || ClientReserves || OperatorReserves
  const elements = useSelector((state) => state.elements);
  const [headerType, setHeaderType] = useState("");
  const [elementsPagination, setElementsPagination] = useState([]);
  const [labelTitle, setLabelTitle] = useState("Reservas");
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

  useEffect(() => {
    const initialElements = elements.slice(0, 10);
    setElementsPagination(initialElements);
  }, [elements, type]);

  useEffect(() => {
    if (type === "ClientReserves") {
      setHeaderType("client");
      setLabelName("Nombre y Apellido");
      setLabelReserveOrEmail("Reserva");
      setLabelButton("Cancelar");
    } else if (type === "AdminBranchOffices") {
      setHeaderType("admin");
      setLabelTitle("Sucursales");
      setLabelReserveOrEmail("Email");
      setLabelReserveOrCapacityOrBranchOffice("Capacidad máxima");
      setLabelNumberReserveOrHorarysOrPhoneNumber("Horario de Inicio y Cierre");
    } else if (type === "AdminOperators") {
      setHeaderType("admin");
      setLabelTitle("Operadores");
      setLabelReserveOrEmail("Email");
      setLabelNumberReserveOrHorarysOrPhoneNumber("Teléfono");
    } else if (type === "OperatorReserves") {
      setHeaderType("operator");
      setLabelName("Nombre y Apellido");
      setLabelReserveOrEmail("Reserva");
      setLabelButton("Confirmación");
    } else if (type === "AdminReserves") {
      setHeaderType("admin");
      setLabelName("Nombre y Apellido");
      setLabelReserveOrEmail("Reserva");
      setLabelButton("Confirmación");
    }
  }, []);

  const handleChange = (e, p) => {
    const startIndex = (p - 1) * 10;
    const endIndex = startIndex + 10;
    setElementsPagination(elements.slice(startIndex, endIndex));
  };

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={headerType} color={color} />
      <div style={{ width: "80%", marginTop: "2rem" }}>
        <h1>{labelTitle}</h1>
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          width: "80%",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {elements.length ? (
            elementsPagination.map((element) => (
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
                <div className={styles.element}>
                  <h2>{labelName}</h2>
                  <h3>
                    {element.full_name
                      ? element.full_name
                      : element.name
                      ? element.name
                      : element.user.full_name
                      ? element.user.full_name
                      : null}
                  </h3>
                </div>
                <div className={styles.element}>
                  <h2>{labelReserveOrEmail}</h2>
                  <h3>
                    {element.email
                      ? element.email
                      : `${element.turn_date} - ${element.horary_id.slice(
                          0,
                          5
                        )}`}
                  </h3>
                </div>
                <div className={styles.element}>
                  <h2>{labelReserveOrCapacityOrBranchOffice}</h2>
                  <h3>
                    {element.boxes
                      ? element.boxes
                      : element.branch_office.name
                      ? element.branch_office.name
                      : element.reservation_date
                      ? element.reservation_date
                      : null}
                  </h3>
                </div>
                <div className={styles.element}>
                  <h2>{labelNumberReserveOrHorarysOrPhoneNumber}</h2>
                  <h3>
                    {type === "AdminOperators"
                      ? element.phone_number
                      : element.opening_time
                      ? `${element.opening_time.slice(
                          0,
                          5
                        )} - ${element.closing_time.slice(0, 5)}`
                      : element.id
                      ? element.id
                      : null}
                  </h3>
                </div>
                <div>
                  {type === "AdminBranchOffices" ||
                  type === "AdminOperators" ? (
                    <div className={styles.buttonsContainer}>
                      <div
                        onClick={() => {
                          onExecute(element.id);
                        }}
                        className={styles.button}
                      >
                        {labelButton}
                      </div>
                      <div
                        onClick={() => {
                          onDelete(element.id);
                        }}
                        className={`${styles.button} ${styles.deleteButton}`}
                      >
                        Eliminar
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        onExecute(element.id);
                      }}
                      className={styles.button}
                    >
                      {labelButton}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No hay {labelTitle} para mostrar.</p>
            </div>
          )}
        </div>
      </div>
      {elements.length > 10 ? (
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(elements.length / 10)}
            shape="rounded"
            color="secondary"
            onChange={handleChange}
            style={{ margin: "20px" }}
          />
        </Stack>
      ) : null}
    </div>
  );
};

export default Table;
