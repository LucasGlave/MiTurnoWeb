import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  id: null,
  fullName: null,
  dni: null,
  email: null,
  role: null,
};

export default createReducer(initialState, {
  [setUser]: (state, action) => action.payload,
});
