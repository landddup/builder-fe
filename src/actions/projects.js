import { nanoid } from "@reduxjs/toolkit";

import { toastActions } from ".";
import { db, dbFunctions } from "../firebase-config";
import { updateProjects } from "../reducers/projects";
import { COLLECTION_TYPES } from "../utils/constants/firebase";
import { TOAST_TYPES } from "../utils/constants/toast";

export function subscribeOnProjects(uid) {
  return (dispatch) => {
    const unsubscribe = dbFunctions.onSnapshot(
      dbFunctions.collection(db, `${COLLECTION_TYPES.PROJECTS}/${uid}/items`),
      async (doc) => {
        const projectsList = [];

        doc.forEach((el) => projectsList.push(el.data()));

        await dispatch(updateProjects({ projectsList: projectsList }));
      }
    );

    return unsubscribe;
  };
}

export function addNewProject(uid) {
  return async (dispatch) => {
    try {
      const newProject = { id: nanoid() };
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
