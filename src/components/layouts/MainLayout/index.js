import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { projectsActions } from "../../../actions";
import { db, dbFunctions } from "../../../firebase-config";
import { COLLECTION_TYPES } from "../../../utils/constants/firebase";

import { AdminToolHeader } from "../../base/Header";

import styles from "./index.module.scss";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.session.currentSession);

  const initProjects = () => {
    const unsubscribe = dbFunctions.onSnapshot(
      dbFunctions.collection(db, `${COLLECTION_TYPES.PROJECTS}/${uid}/items`),
      async (doc) => {
        let projectsList = [];

        doc.forEach((el) => projectsList.push({ ...el.data(), dbId: el.id }));

        await dispatch(projectsActions.setProjects(projectsList));
      },
      async (error) => {
        console.log("subscribeOnProjects error: ", error);

        await dispatch(projectsActions.setProjects([]));
      }
    );

    return unsubscribe;
  };

  const initTemplates = () => {
    const unsubscribe = dbFunctions.onSnapshot(
      dbFunctions.collection(db, COLLECTION_TYPES.TEMPLATES),
      async (doc) => {
        let templates = [];

        doc.forEach((el) => {
          const data = el.data();

          templates.push({ ...data, createdAt: data.createdAt.seconds });
        });

        await dispatch(projectsActions.setTemplates(templates));
      },
      async (error) => {
        console.log("subscribeOnTemplates error: ", error);

        await dispatch(projectsActions.setTemplates([]));
      }
    );

    return unsubscribe;
  };

  const resetToInitial = () => {
    dispatch(projectsActions.setProjectsToInitial());
    dispatch(projectsActions.setTemplatesToInitial());
  };

  useEffect(() => {
    const unsubscribeProjects = initProjects();
    const unsubscribeTemplates = initTemplates();

    return () => {
      unsubscribeProjects();
      unsubscribeTemplates();
      resetToInitial();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <AdminToolHeader />

      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default MainLayout;
