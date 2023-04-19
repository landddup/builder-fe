import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../actions";
import firebase from "../../../firebase-config";
import constants from "../../../utils/constants";

import { ProfileHeader } from "../../base";

import styles from "./index.module.scss";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.session.currentSession);

  const initProjects = () => {
    const unsubscribe = firebase.functions.db.onSnapshot(
      firebase.functions.db.collection(
        firebase.db,
        `${constants.firebase.COLLECTION_TYPES.PROJECTS}/${uid}/items`
      ),
      async (doc) => {
        let projectsList = [];

        doc.forEach((el) => projectsList.push({ ...el.data(), dbId: el.id }));

        await dispatch(actions.projects.setProjects(projectsList));
      },
      async (error) => {
        console.log("subscribeOnProjects error: ", error);

        await dispatch(actions.projects.setProjects([]));
      }
    );

    return unsubscribe;
  };

  const resetToInitial = () => {
    dispatch(actions.projects.setProjectsToInitial());
  };

  useEffect(() => {
    const unsubscribeProjects = initProjects();

    dispatch(actions.projects.initTemplates());

    return () => {
      unsubscribeProjects();
      resetToInitial();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <ProfileHeader />

      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default MainLayout;
