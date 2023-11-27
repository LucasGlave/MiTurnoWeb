import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    id: null,
    fullName: "",
    dni: "",
    email: "",
    roleId: "",
    phoneNumber: "",
    branchOfficeId:"",
  },
  reducers: {
    setUser: (state, action) => {
      state.dni = action.payload.dni;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.phoneNumber = action.payload.phoneNumber;
      state.id = action.payload.id;
      state.roleId = action.payload.roleId;
      state.branchOfficeId=action.payload.branchOfficeId;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;