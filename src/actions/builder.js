import { cloneDeep, get, set, unset } from "lodash";
import dayjs from "dayjs";

import firebase from "../firebase-config";
import constants from "../utils/constants";
import {
  clearProject,
  updateProject,
  updateElements,
  updateDraggedElement,
} from "../reducers/builder";

function preparePath(path, actionKey) {
  const splitted = path.split(".");
  const joined = splitted.join(".elements.");

  if (!path) {
    return "elements";
  }

  if (actionKey === "add") {
    return `elements.${joined}.elements`;
  }

  if (actionKey === "delete") {
    return `elements.${joined}`;
  }

  if (actionKey === "edit") {
    const spliced = splitted.splice(0, splitted.length - 1);

    if (!!spliced.length) {
      return `elements.${spliced.join(".elements.")}.elements`;
    }

    return "elements";
  }
}

function addElement(elements, newElement) {
  const output = { ...elements };
  const newElementIndex = Object.keys(output).length;

  output[newElementIndex] = {
    ...newElement,
    createdAt: { seconds: dayjs().unix() },
  };

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

export function dropElement(path, projectId) {
  return async (dispatch, getState) => {
    const { project, draggedElement } = getState().builder;
    const preparedPath = preparePath(path, "add");
    const clonedData = cloneDeep({ project, draggedElement });
    const elementsToUpdate = get(clonedData.project, preparedPath);
    const updatedElements = addElement(
      elementsToUpdate,
      clonedData.draggedElement
    );

    const updatedProject = set(
      clonedData.project,
      preparedPath,
      updatedElements
    );

    dispatch(updateElementsInDb(updatedProject, projectId));
  };
}

export function deleteElement(path, projectId) {
  return async (dispatch, getState) => {
    const { project } = getState().builder;
    const preparedPath = preparePath(path, "delete");
    const clonedProject = cloneDeep(project);

    unset(clonedProject, preparedPath);
    dispatch(updateElementsInDb(clonedProject, projectId));
  };
}

export function replaceElements(path, currentIndex, nextIndex) {
  return async (dispatch, getState) => {
    const { project, draggedElement } = getState().builder;
    const preparedPath = preparePath(path, "edit");
    const clonedData = cloneDeep({ project, draggedElement });
    const elements = get(clonedData.project, preparedPath);

    [elements[currentIndex], elements[nextIndex]] = [
      elements[nextIndex],
      elements[currentIndex],
    ];

    const updatedProject = set(clonedData.project, preparedPath, elements);

    dispatch(setProject(updatedProject));
  };
}
