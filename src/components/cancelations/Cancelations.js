"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { turnServiceById, turnServiceCancel } from "@/services/turn.service";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function Cancelations() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useRouter();
  const [turn, setTurn] = useState({
    horary_id: "",
  });
  const [branchOffice, setBranchOffice] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);

  useEffect(() => {
    turnServiceById(id).then((turn) => {
      if (
        turn.confirmation_id === "cancelled" ||
        turn.confirmation_id === "confirmed"
      ) {
        navigate.push(`/reserves-panel-client/${user.id}`);
      } else {
        setTurn(turn);
        setBranchOffice(turn.branch_office.name);
      }
    });
  }, []);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };

  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
  };

  const handleChange4 = (event) => {
    setChecked4(event.target.checked);
  };

  const handleChange5 = (event) => {
    setChecked5(event.target.checked);
  };

  const executeFunction = () => {
    let reason_cancellation = "";
    if (checked1 === true) {
      reason_cancellation = "Ya no quiero ir";
    } else if (checked2 === true) {
      reason_cancellation = "Me equivoqué de horario";
    } else if (checked3 === true) {
      reason_cancellation = "Encontré un lugar mejor";
    } else if (checked4 === true) {
      reason_cancellation = "Me cancelaron";
    } else {
      reason_cancellation = "Otro";
    }
    turnServiceCancel(turn.id, reason_cancellation).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El turno ha sido cancelado",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate.push(`/reserves-panel-client/${user.id}`);
      });
    });
  };

  const handleCancellation = (isChecked) => {
    if (isChecked) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#ede4ed",
              paddingTop: "10px",
              marginTop: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px",
            }}
          >
            <div>
              <p>Su reserva actual será cancelada</p>
              <p>La cancelación no puede ser revertida</p>
            </div>
          </div>
          <div
            onClick={() => {
              executeFunction();
            }}
            className={styles.button}
            style={{ marginTop: "30px", backgroundColor: "#d33" }}
          >
            Confirmar cancelación
          </div>
        </>
      );
    }
    return null;
  };

  const handleBack = () => {
    navigate.back();
  };
  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} isPosition={"client"} />

      <div className={styles.card} style={{ width: "90%", marginTop: "3rem" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <div className={styles.group} style={{ width: "60%" }}>
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
                onClick={handleBack}
                style={{ cursor: "pointer" }}
                className={styles.back}
              >
                Atras
              </h4>
            </div>
            <h1 style={{ marginTop: "0px", marginBottom: "3rem" }}>
              Cancelar reserva
            </h1>

            <p>Hola {user.full_name},</p>
            <h3>¿Por que desea cancelar su reserva?</h3>
            <hr />
            <FormGroup>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  disabled={checked2 || checked3 || checked4 || checked5}
                  control={
                    <Checkbox checked={checked1} onChange={handleChange1} />
                  }
                  label={
                    <span style={checked1 ? { fontWeight: "bold" } : null}>
                      Ya no quiero ir
                    </span>
                  }
                />
              </div>
              {handleCancellation(checked1)}
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  disabled={checked1 || checked3 || checked4 || checked5}
                  control={
                    <Checkbox checked={checked2} onChange={handleChange2} />
                  }
                  label={
                    <span style={checked2 ? { fontWeight: "bold" } : null}>
                      Me equivoqué de horario
                    </span>
                  }
                />
              </div>
              {handleCancellation(checked2)}
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  disabled={checked1 || checked2 || checked4 || checked5}
                  control={
                    <Checkbox checked={checked3} onChange={handleChange3} />
                  }
                  label={
                    <span style={checked3 ? { fontWeight: "bold" } : null}>
                      Encontré un lugar mejor
                    </span>
                  }
                />
              </div>
              {handleCancellation(checked3)}
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  disabled={checked1 || checked2 || checked3 || checked5}
                  control={
                    <Checkbox checked={checked4} onChange={handleChange4} />
                  }
                  label={
                    <span style={checked4 ? { fontWeight: "bold" } : null}>
                      Me cancelaron
                    </span>
                  }
                />
              </div>
              {handleCancellation(checked4)}
              <hr />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  disabled={checked1 || checked2 || checked3 || checked4}
                  control={
                    <Checkbox checked={checked5} onChange={handleChange5} />
                  }
                  label={
                    <span style={checked5 ? { fontWeight: "bold" } : null}>
                      Otro
                    </span>
                  }
                />
              </div>
              {handleCancellation(checked5)}
            </FormGroup>
          </div>

          <div
            className={styles.group}
            style={{ width: "30%", marginTop: "3rem" }}
          >
            <p>Información de la reserva</p>
            <h2>
              <strong>{turn.full_name}</strong>
            </h2>
            <hr />
            <p>
              <strong>Dia:</strong> {turn.turn_date}
            </p>
            <p>
              <strong>Horario:</strong> {turn.horary_id.slice(0, 5)}
            </p>
            <p>
              <strong>Sucursal:</strong> {branchOffice}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Cancelations;
