import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { projectsActions } from "../../../actions";

import Header from "../../base/Header";

import styles from "./index.module.scss";

const MainLayout = ({ children }) => {
  const { uid } = useSelector((state) => state.session.currentSession);
  const dispatch = useDispatch();

  const initProjects = () => {
    dispatch(projectsActions.subscribeOnProjects(uid));
    dispatch(projectsActions.subscribeOnTemplates());
  };

  useEffect(() => {
    initProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <Header />

      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default MainLayout;
