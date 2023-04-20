import { createSlice } from "@reduxjs/toolkit";

export const builderSlice = createSlice({
  name: "projects",
  initialState: {
    project: {},
    elements: {},
    draggedElement: {},
    projectLoading: true,
    elementsLoading: true,
  },
  reducers: {
    updateProject: (state, action) => {
      state.project = action.payload.project;
      state.projectLoading = false;
    },
    updateElements: (state, action) => {
      state.elements = action.payload.elements;
      state.elementsLoading = false;
    },
    clearProject: (state) => {
      state.project = {};
      state.projectLoading = true;
    },
    updateDraggedElement: (state, action) => {
      state.draggedElement = action.payload.draggedElement;
    },
  },
});

export const {
  updateProject,
  updateElements,
  clearProject,
  updateDraggedElement,
} = builderSlice.actions;

export default builderSlice.reducer;
