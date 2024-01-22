import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./examSlice";
import userReducer from "./userSlice";
export default configureStore({
  reducer: {
    exam: examReducer,
    user: userReducer,
  },
});
