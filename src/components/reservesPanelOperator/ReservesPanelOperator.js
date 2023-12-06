import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import {
  turnServiceConfirm,
  turnServiceGetByConfirmation,
  turnServiceGetByConfirmationAndBranchOffice,
} from "@/services/turn.service";
import { useDispatch, useSelector } from "react-redux";
import { removeElement, setElements } from "@/state/elements";
import Swal from "sweetalert2";

const ReservesPanelOperator = () => {
  const user = useSelector((state) => state.user);
  const elements = useSelector((state) => state.elements);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.role_id === "operator") {
      turnServiceGetByConfirmationAndBranchOffice(user.branch_office_id).then(
        (turns) => {
          dispatch(setElements(turns));
        }
      );
    } else if (user.role_id === "admin" || user.role_id === "super admin") {
      turnServiceGetByConfirmation("pending").then((turns) => {
        dispatch(setElements(turns));
      });
    }
  }, []);

  const onExecute = (id) => {
    Swal.fire({
      title: "Confirme la asistencia.",
      text: "​",
      icon: "question",
      iconColor: "#a442f1",
      showDenyButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#a442f1",
      denyButtonColor: "#545454",
      confirmButtonText: "Presente",
      denyButtonText: "Ausente",
    }).then((result) => {
      if (result.isConfirmed) {
        turnServiceConfirm(id, { confirmation_id: "confirmed" }).then(() => {
          dispatch(removeElement(id));
          Swal.fire({
            title: "¡Turno confirmado!",
            text: "El cliente asistió a la reserva.",
            icon: "success",
          });
        });
      } else if (result.isDenied) {
        turnServiceConfirm(id, { confirmation_id: "absence" }).then(() => {
          dispatch(removeElement(id));
          Swal.fire({
            title: "¡Turno confirmado!",
            text: "El cliente faltó a la reserva.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <Table
      type="OperatorReserves"
      onExecute={onExecute}
      color={"reserve-panel"}
    />
  );
};

export default ReservesPanelOperator;
