import React from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../../containers";
import { BuilderComponentsMenu } from "../../base";

import styles from "./index.module.scss";

const Project = () => {
  const { projectLoading } = useSelector((state) => state.builder);

  return (
    <div className={styles.container}>
      <BuilderComponentsMenu />

      <div className={styles.content}>
        <LoadingContainer isLoading={projectLoading}>
        </LoadingContainer>
      </div>
    </div>
  );
};

export default Project;
