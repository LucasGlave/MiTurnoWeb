import { createSlice } from "@reduxjs/toolkit";

export const elements = createSlice({
  name: "elements",
  initialState: [],
  reducers: {
    setElements: (state, action) => action.payload,
    removeElement: (state, action) => {
      return state.filter((element) => element.id !== action.payload);
    },
  },
});

export const { setElements, removeElement } = elements.actions;

export default elements.reducer;
