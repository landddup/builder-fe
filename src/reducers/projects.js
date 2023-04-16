import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: [],
    templates: [],
    isLoading: true,
  },
  reducers: {
    updateProjects: (state, action) => {
      state.projectsList = action.payload.projectsList;
      state.isLoading = false;
    },
    clearProjects: (state) => {
      state.projectsList = [];
      state.isLoading = true;
    },
    updateTemplates: (state, action) => {
      state.templates = action.payload.templates;
    },
    clearTemplates: (state) => {
      state.templates = [];
    },
  },
});

export const {
  updateProjects,
  clearProjects,
  updateTemplates,
  clearTemplates,
} = projectsSlice.actions;

export default projectsSlice.reducer;
