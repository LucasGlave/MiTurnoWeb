import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    id: null,
    full_name: "",
    dni: "",
    email: "",
    role_id: "",
    phone_number: "",
    branch_office_id: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.dni = action.payload.dni;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      state.phone_number = action.payload.phone_number;
      state.id = action.payload.id;
      state.role_id = action.payload.role_id;
      state.branch_office_id = action.payload.branch_office_id;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
