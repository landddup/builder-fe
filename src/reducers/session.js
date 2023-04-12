import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    currentSession: null,
    isLoading: true,
  },
  reducers: {
    createSession: (state, action) => {
      state.currentSession = action.payload.currentSession;
      state.isLoading = false;
    },
  },
});

export const { createSession } = sessionSlice.actions;

export default sessionSlice.reducer;
