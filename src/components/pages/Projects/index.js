import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Block from "../../base/Block";
import LoadingContainer from "../../containers/LoadingContainer";
import DummyProjects from "./molecules/DummyProjects";

import styles from "./index.module.scss";
import { projectsActions } from "../../../actions";
import Button from "../../base/Button";

const Projects = () => {
  const dispatch = useDispatch();
  const {
    projects: { isLoading, projectsList },
    session: { currentSession },
  } = useSelector((state) => state);

  const [fetching, setFetching] = useState(false);

  const handleAddProject = async () => {
    setFetching(true);

    await dispatch(projectsActions.addNewProject(currentSession.uid));

    setFetching(false);
  };

  return (
    <div className={styles.container}>
      <LoadingContainer isLoading={isLoading}>
        <Block className={styles.block}>
          <div className={styles.blockHeader}>
            <h2 className={styles.headerTitle}>My projects</h2>

            <Button
              label="Add new project"
              isLoading={fetching}
              onClick={handleAddProject}
              className={styles.button}
            />
          </div>

          <div className={styles.content}>
            {!!projectsList.length ? (
              <div className={styles.projects}>
                {projectsList.map((project) => {
                  const { id } = project;

                  return <button key={id} className={styles.project} />;
                })}
              </div>
            ) : (
              <DummyProjects />
            )}
          </div>
        </Block>
      </LoadingContainer>
    </div>
  );
};

export default Projects;
