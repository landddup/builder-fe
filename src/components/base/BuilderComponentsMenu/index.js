import React from "react";
import { useSelector } from "react-redux";

import constants from "../../../utils/constants";

import { LoadingContainer } from "../../containers";
import { CustomLink, SvgIcon } from "../../shared";

import styles from "./index.module.scss";

const BuilderComponentsMenu = () => {
  const { componentsLoading, components } = useSelector(
    (state) => state.builder
  );

  return (
    <div className={styles.container}>
      <CustomLink to={constants.routes.ROOT} icon="arrowLeft" text="ALL PROJECTS" replace />

      <LoadingContainer
        width={30}
        height={30}
        isLoading={componentsLoading}
      >
        <div className={styles.nav}>
          {Object.values(components).map(component => {
            const { title, icon } = component;

            console.log(component);

            return <div key={title} className={styles.component}><SvgIcon type={icon} className={styles.icon} /></div>;
          })}
        </div>
      </LoadingContainer>
    </div>
  );
};

export default BuilderComponentsMenu;
