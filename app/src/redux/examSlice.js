import { createSlice } from "@reduxjs/toolkit";

export const examSlice = createSlice({
  name: "exam",
  initialState: {
    questions: null,
    time: null,
    user: null,
    director: null,
    topic: null,
    id: null,
  },
  reducers: {
    setExam: (state, action) => {
      const { questions, time, user, director, topic, id } = action.payload;
      state.questions = questions;
      state.time = time;
      state.user = user;
      state.director = director;
      state.topic = topic;
      state.id = id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setExam } = examSlice.actions;

export default examSlice.reducer;
