import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import {
  turnServiceConfirm,
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
    turnServiceGetByConfirmationAndBranchOffice(user.branch_office_id).then(
      (turns) => {
        dispatch(setElements(turns));
      }
    );
  }, []);

  const onExecute = (id) => {
    Swal.fire({
      title: "¿Está seguro de confirmar la asistencia del turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7066e0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        turnServiceConfirm(id).then(() => {
          dispatch(removeElement(id));
          Swal.fire({
            title: "¡Turno confirmado!",
            text: "El turno ha sido confirmado con éxito.",
            icon: "success",
          });
        });
      }
    });
  };

  return <Table type="OperatorReserves" onExecute={onExecute} />;
};

export default ReservesPanelOperator;
