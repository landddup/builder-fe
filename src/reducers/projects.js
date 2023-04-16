import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: [],
    isLoading: true,
  },
  reducers: {
    updateProjects: (state, action) => {
      state.projectsList = action.payload.projectsList;
      state.isLoading = false;
    },
    clearProjects: (state, action) => {
      state.projectsList = [];
      state.isLoading = true;
    },
  },
});

export const { updateProjects, clearProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
