import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { userServiceDelete, userServiceGetAllOperators } from "@/services/user.service";
import { removeElement, setElements } from "@/state/elements";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const OperatorsPanel = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    userServiceGetAllOperators().then((operatorsResult) => {
      dispatch(setElements(operatorsResult.data));
    });
  }, []);

  const onExecute = (id) => {
    navigate.push(`/edit-operator/${id}`);
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "¿Está seguro de eliminar operador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7066e0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        userServiceDelete(id).then(() => {
          dispatch(removeElement(id));
          Swal.fire({
            title: "¡Operador eliminado!",
            text: "El operador ha sido confirmado con éxito.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <Table
      type="AdminOperators"
      color={"operators-panel"}
      onExecute={onExecute} onDelete={onDelete}
    />
  );
};

export default OperatorsPanel;
