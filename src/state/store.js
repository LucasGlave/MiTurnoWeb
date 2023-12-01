import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import elementsReducer from "./elements";

const store = configureStore({
  reducer: {
    user: userReducer,
    elements: elementsReducer,
  },
});

export default store;
