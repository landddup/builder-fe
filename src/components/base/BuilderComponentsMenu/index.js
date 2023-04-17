import React from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../../containers";

import styles from "./index.module.scss";

const BuilderComponentsMenu = () => {
  const { componentsLoading, components } = useSelector(
    (state) => state.builder
  );

  return (
    <div className={styles.container}>
      <LoadingContainer
        width={30}
        height={30}
        isLoading={componentsLoading}
      ></LoadingContainer>
    </div>
  );
};

export default BuilderComponentsMenu;
