import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    id: null,
    fullName: "",
    dni: "",
    email: "",
    role: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.dni = action.payload.dni;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;