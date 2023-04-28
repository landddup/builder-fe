import { cloneDeep, get, set, unset } from "lodash";
import { nanoid } from "@reduxjs/toolkit";

import { findPath } from "../utils/helpers/builder";
import firebase from "../firebase-config";
import constants from "../utils/constants";

import {
  clearProject,
  updateProject,
  updateElements,
  updateDraggedElement,
} from "../reducers/builder";

function addElement(elements, newElement) {
  const output = { ...elements };
  const newElementIndex = Object.keys(output).length;

  output[newElementIndex] = {
    ...newElement,
    id: nanoid(),
  };

  delete output[newElementIndex].createdAt;

  return output;
}

export function setProject(project) {
  return async (dispatch) => {
    await dispatch(updateProject({ project }));
  };
}

export function setProjectToInitial() {
  return async (dispatch) => {
    await dispatch(clearProject());
  };
}

export function initElements() {
  return async (dispatch) => {
    const elements = {};
    const collectionSnap = await firebase.functions.db.getDocs(
      firebase.functions.db.collection(
        firebase.db,
        constants.firebase.COLLECTION_TYPES.ELEMENTS
      )
    );

    collectionSnap.forEach((el) => (elements[el.id] = el.data()));

    dispatch(updateElements({ elements }));
  };
}

export function setDraggedElement(draggedElement) {
  return async (dispatch) => dispatch(updateDraggedElement({ draggedElement }));
}

export function updateElementsInDb(project, projectId) {
  return async (_, getState) => {
    const { uid } = getState().session.currentSession;
    const docRef = firebase.functions.db.doc(
      firebase.db,
      `${constants.firebase.COLLECTION_TYPES.PROJECTS}/${uid}/items/${projectId}`
    );

    await firebase.functions.db.updateDoc(
      docRef,
      constants.firebase.COLLECTION_TYPES.ELEMENTS,
      project.elements
    );
  };
}

export function dropElement(nodeId) {
  return async (dispatch, getState) => {
    const { project, draggedElement } = getState().builder;
    const path = findPath(project, "id", nodeId);
    const preparedPath = `${!!path ? `${path}.` : path}elements`;
    const clonedData = cloneDeep({ project, draggedElement });
    const elementsToUpdate = get(clonedData.project, preparedPath) || {};
    const updatedElements = addElement(
      elementsToUpdate,
      clonedData.draggedElement
    );

    const updatedProject = set(
      clonedData.project,
      preparedPath,
      updatedElements
    );

    dispatch(setProject(updatedProject));
  };
}

export function deleteElement(nodeId) {
  return async (dispatch, getState) => {
    const { project } = getState().builder;
    const preparedPath = findPath(project, "id", nodeId);
    const clonedProject = cloneDeep(project);

    unset(clonedProject, preparedPath);
    dispatch(setProject(clonedProject));
  };
}

export function replaceElements(nodeId, currentIndex, nextIndex) {
  return async (dispatch, getState) => {
    const { project } = getState().builder;
    const path = findPath(project, "id", nodeId);
    const preparedPath = path.split(".").slice(0, -1).join(".");
    const clonedProject = cloneDeep(project);
    const elements = get(clonedProject, preparedPath);

    [elements[currentIndex], elements[nextIndex]] = [
      elements[nextIndex],
      elements[currentIndex],
    ];

    const updatedProject = set(clonedProject, preparedPath, elements);

    dispatch(setProject(updatedProject));
  };
}
