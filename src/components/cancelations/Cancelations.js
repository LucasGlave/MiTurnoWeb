"use client";
import React, { useEffect, useState } from "react";
import styles from "../../app/general.module.scss";
import Header from "../header/Header";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { turnServiceById, turnServiceCancel } from "@/services/turn.service";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { reasonCancellationServiceAll } from "@/services/reasonCancellation";

function Cancelations() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useRouter();
  const [turn, setTurn] = useState({
    horary_id: "",
  });
  const [branchOfficeName, setBranchOfficeName] = useState("");
  const [reasonCancellations, setReasonCancellations] = useState([]);
  const [reasonCancellationId, setReasonCancellationId] = useState(null);
  const [isReasonCancellationSelected, setIsReasonCancellationSelected] =
    useState(false);

  useEffect(() => {
    turnServiceById(id).then((turn) => {
      if (
        turn.confirmation_id === "cancelled" ||
        turn.confirmation_id === "confirmed"
      ) {
        navigate.push(`/reserves-panel-client/${user.id}`);
      } else {
        setTurn(turn);
        setBranchOfficeName(turn.branch_office.name);
        reasonCancellationServiceAll().then((reasonCancellations) => {
          setReasonCancellations(reasonCancellations);
        });
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setReasonCancellationId(value);
      setIsReasonCancellationSelected(checked);
    } else {
      setReasonCancellationId(null);
      setIsReasonCancellationSelected(checked);
    }
  };

  const executeFunction = () => {
    turnServiceCancel(turn.id, reasonCancellationId).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El turno ha sido cancelado",
        showConfirmButton: false,
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
            <div>
              <Box>
                <FormControl>
                  <FormGroup>
                    {reasonCancellations.map((reasonCancellation) => (
                      <div
                        key={reasonCancellation.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                parseInt(reasonCancellationId) ===
                                parseInt(reasonCancellation.id)
                              }
                              value={reasonCancellation.id}
                              onChange={handleInputChange}
                              disabled={
                                reasonCancellationId !== null &&
                                parseInt(reasonCancellationId) !==
                                  parseInt(reasonCancellation.id)
                              }
                            />
                          }
                          label={<span>{reasonCancellation.reason}</span>}
                        />
                      </div>
                    ))}
                  </FormGroup>
                </FormControl>
                {handleCancellation(isReasonCancellationSelected)}
              </Box>
              <hr />
            </div>
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
              <strong>Sucursal:</strong> {branchOfficeName}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Cancelations;
