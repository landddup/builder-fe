import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoadingContainer, BuilderElementContainer } from "../../containers";
import { BuilderElementsMenu } from "../../base";
import { Elements } from "./molecules";

import styles from "./index.module.scss";
import actions from "../../../actions";

const Project = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { projectLoading, project } = useSelector((state) => state.builder);

  useEffect(() => {
    if (!projectLoading && !!project && !!projectId) {
      dispatch(actions.builder.updateElementsInDb(project, projectId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className={styles.container}>
      <BuilderElementsMenu />

      <div className={styles.builder}>
        <LoadingContainer isLoading={projectLoading}>
          <BuilderElementContainer
            className={styles.dropContainer}
            deleteAllowed={false}
          >
            <Elements elements={project.elements} />
          </BuilderElementContainer>
        </LoadingContainer>
      </div>
    </div>
  );
};

export default Project;
