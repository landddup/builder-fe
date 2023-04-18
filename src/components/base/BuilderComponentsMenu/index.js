import React from "react";
import { useSelector } from "react-redux";

import { LoadingContainer } from "../../containers";
import { SvgIcon } from "../../shared";

import styles from "./index.module.scss";

const BuilderComponentsMenu = () => {
  const { componentsLoading, components } = useSelector(
    (state) => state.builder
  );

  return (
    <div className={styles.container}>
      <LoadingContainer width={30} height={30} isLoading={componentsLoading}>
        <div className={styles.nav}>
          {Object.values(components).map((component) => {
            const { title, icon } = component;

            return (
              <div draggable key={title} className={styles.component}>
                <SvgIcon type={icon} className={styles.icon} />

                <p className={styles.title}>{title}</p>
              </div>
            );
          })}
        </div>
      </LoadingContainer>
    </div>
  );
};

export default BuilderComponentsMenu;
