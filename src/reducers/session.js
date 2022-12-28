import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    session: null,
    isLoading: true,
  },
  reducers: {
    createSession: (state, action) => {
      state.session = action.payload.session;
      state.isLoading = false;
    },
    removeSession: (state) => {
      state.session = null;
    },
  },
});

export const { createSession, removeSession } = sessionSlice.actions;

export default sessionSlice.reducer;
