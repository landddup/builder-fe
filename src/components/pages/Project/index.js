import React from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../../containers";
import { BuilderComponentsMenu } from "../../base";

import styles from "./index.module.scss";

const Project = () => {
  const { projectLoading } = useSelector((state) => state.builder);

  return (
    <LoadingContainer isLoading={projectLoading}>
      <BuilderComponentsMenu />

      <div className={styles.content}></div>
    </LoadingContainer>
  );
};

export default Project;
