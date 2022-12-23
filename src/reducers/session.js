import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    session: null,
  },
  reducers: {
    create: (state, action) => {
      state.session = action.payload.session;
    },
    remove: (state) => {
      state.session = null;
    },
  },
});

export const { create, remove } = sessionSlice.actions;

export default sessionSlice.reducer;
