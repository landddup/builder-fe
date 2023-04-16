import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { toastActions } from ".";
import { db, dbFunctions } from "../firebase-config";

import {
  updateProjects,
  updateTemplates,
  clearProjects,
  clearTemplates,
} from "../reducers/projects";

import { COLLECTION_TYPES } from "../utils/constants/firebase";
import { TOAST_TYPES } from "../utils/constants/toast";

function sortByDate(items) {
  const output = items.sort((a, b) =>
    dayjs(a.createdAt).isAfter(b.createdAt) ? -1 : 1
  );

  return output;
}

export function setProjects(projectsList) {
  return async (dispatch) => {
    await dispatch(updateProjects({ projectsList }));
  };
}

export function setTemplates(templates) {
  return async (dispatch) => {
    await dispatch(updateTemplates({ templates }));
  };
}

export function subscribeOnProjects(uid) {
  return (dispatch) => {
    dbFunctions.onSnapshot(
      dbFunctions.collection(db, `${COLLECTION_TYPES.PROJECTS}/${uid}/items`),
      async (doc) => {
        let projectsList = [];

        doc.forEach((el) => projectsList.push(el.data()));

        await dispatch(setProjects(sortByDate(projectsList)));
      },
      async (error) => {
        console.log("subscribeOnProjects error: ", error);

        await dispatch(clearProjects());
      }
    );
  };
}

export function subscribeOnTemplates() {
  return (dispatch) => {
    dbFunctions.onSnapshot(
      dbFunctions.collection(db, COLLECTION_TYPES.TEMPLATES),
      async (doc) => {
        let templates = [];

        doc.forEach((el) => {
          const data = el.data();

          templates.push({ ...data, createdAt: data.createdAt.seconds });
        });

        await dispatch(setTemplates(sortByDate(templates)));
      },
      async (error) => {
        console.log("subscribeOnTemplates error: ", error);

        await dispatch(clearTemplates());
      }
    );
  };
}

export function addNewProject({ uid, ...rest }) {
  return async (dispatch) => {
    try {
      const newProject = { id: nanoid(), createdAt: dayjs().unix(), ...rest };
      const collectionRef = dbFunctions.collection(
        db,
        `${COLLECTION_TYPES.PROJECTS}/${uid}/items`
      );

      await dbFunctions.addDoc(collectionRef, newProject);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Project successfully added",
        })
      );
    } catch (error) {
      console.log("addNewProject error: ", error);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: "Project not added",
        })
      );
    }
  };
}

export function deleteProject(uid, id) {
  return async (dispatch) => {
    try {
      const collectionRef = dbFunctions.collection(
        db,
        `${COLLECTION_TYPES.PROJECTS}/${uid}/items`
      );

      const docsRef = await dbFunctions.getDocs(collectionRef);

      docsRef.forEach(async (el) => {
        const { id: docId } = el;
        const { id: dataId } = el.data();

        if (dataId === id) {
          await dbFunctions.deleteDoc(dbFunctions.doc(collectionRef, docId));
        }
      });

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.SUCCESS,
          duration: 3000,
          message: "Project successfully deleted",
        })
      );
    } catch (error) {
      console.log("deleteProject error: ", error);

      await dispatch(
        toastActions.show({
          type: TOAST_TYPES.ERROR,
          duration: 3000,
          message: "Project not deleted",
        })
      );
    }
  };
}
