import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./examSlice";

export default configureStore({
  reducer: {
    exam: examReducer,
  },
});
