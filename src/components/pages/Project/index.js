import React from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../../containers";
import { BuilderComponentsMenu, BuilderHeader } from "../../base";

import styles from "./index.module.scss";

const Project = () => {
  const { projectLoading } = useSelector((state) => state.builder);

  return (
    <div className={styles.container}>
      <BuilderHeader />

      <div className={styles.content}>
        <BuilderComponentsMenu />

        <LoadingContainer isLoading={projectLoading}></LoadingContainer>
      </div>
    </div>
  );
};

export default Project;
