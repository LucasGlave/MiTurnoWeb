import * as React from "react";
import { useState } from "react"; // Importa useState
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={selectedDate} onChange={handleDateChange} />
      <p>
        Fecha seleccionada: {selectedDate ? selectedDate.toString() : "Ninguna"}
      </p>
      <p>hacer logica con inputs y este valor</p>
    </LocalizationProvider>
  );
};

export default Calendario;
