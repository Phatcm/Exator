import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    username: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { email, username } = action.payload;
      state.email = email;
      state.username = username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
