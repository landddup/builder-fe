import React from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../../containers";
import { BuilderElementsMenu } from "../../base";
import { Elements } from "./molecules";

import styles from "./index.module.scss";

const Project = () => {
  const { projectLoading, project } = useSelector((state) => state.builder);

  return (
    <div className={styles.container}>
      <BuilderElementsMenu />

      <div className={styles.builder}>
        <LoadingContainer isLoading={projectLoading}>
          <Elements elements={project.elements} />
        </LoadingContainer>
      </div>
    </div>
  );
};

export default Project;
