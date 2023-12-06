import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import {
  branchOfficeServiceAll,
  branchOfficeServiceDelete,
} from "@/services/branchOffice.service";
import { removeElement, setElements } from "@/state/elements";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const BranchOfficesPanel = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    branchOfficeServiceAll().then((branchOffices) => {
      dispatch(setElements(branchOffices.data));
    });
  }, []);

  const onExecute = (id) => {
    navigate.push(`/branch-office-details/${id}`);
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "¿Está seguro de eliminar la sucursal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7066e0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        branchOfficeServiceDelete(id)
          .then(() => {
            dispatch(removeElement(id));
            Swal.fire({
              title: "¡Sucursal eliminada!",
              text: "La sucursal ha sido eliminada con éxito.",
              icon: "success",
            });
          })
          .catch((err) => {
            if (err.response.status === 409) {
              Swal.fire({
                title: "No se pudo eliminar la sucursal",
                text: "Esta sucursal aún tiene turnos asignados.",
                icon: "warning",
                confirmButtonColor: "#7066e0",
                confirmButtonText: "Aceptar",
              });
            }
          });
      }
    });
  };

  return (
    <Table
      color={"branch-office"}
      type="AdminBranchOffices"
      onExecute={onExecute}
      onDelete={onDelete}
    />
  );
};

export default BranchOfficesPanel;
