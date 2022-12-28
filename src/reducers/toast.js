import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_TOAST_DURATION } from "../utils/constants/toast";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    type: "",
    message: "",
    duration: 3000,
  },
  reducers: {
    showToast: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.duration = action.payload.duration;
    },
    hideToast: (state) => {
      state.type = "";
      state.message = "";
      state.duration = DEFAULT_TOAST_DURATION;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
