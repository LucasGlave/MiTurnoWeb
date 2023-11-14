"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const initialRows = [
  {
    id: 1,
    nombreYApellido: "Boca",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 2323434,
  },
  {
    id: 2,
    nombreYApellido: "Juniors",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 2322234,
  },
  {
    id: 3,
    nombreYApellido: "Boca",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
  {
    id: 4,
    nombreYApellido: "Juniors",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
  {
    id: 5,
    nombreYApellido: "Boca",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
  {
    id: 6,
    nombreYApellido: "Juniors",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
  {
    id: 7,
    nombreYApellido: "Boca",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
  {
    id: 8,
    nombreYApellido: "Juniors",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
  {
    id: 9,
    nombreYApellido: "Boca",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
  {
    id: 10,
    nombreYApellido: "Juniors",
    reserva: new Date(),
    sucursal: "La Bombonera",
    nDeLaReserva: 23234,
  },
];

export default function TableReserve() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "nombreYApellido",
      headerName: "Nombre y Apellido",
      width: 180,
      editable: true,
    },
    {
      field: "reserva",
      headerName: "Reserva",
      type: "Date",
      editable: true,
      width: 280,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "sucursal",
      headerName: "Sucursal",
      width: 220,
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "nDeLaReserva",
      headerName: "N de la reserva",
      type: "number",
      editable: true,
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Editar",
      width: 100,
      align: "right",
      headerAlign: "right",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "#a442f1",
              }}
              onClick={handleSaveClick(id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            style={{ color: "#a442f1" }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        style={{ display: "flex", alignItems: "center" }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
