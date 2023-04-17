import React from "react";

import constants from "../../../../utils/constants";

import { CustomLink } from "../../../shared";

import styles from "./index.module.scss";

const BuilderHeader = () => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <CustomLink
          className={styles.link}
          text="ALL PROJECTS"
          icon="arrowLeft"
          to={constants.routes.ROOT}
          replace
        />
      </div>
    </header>
  );
};

export default BuilderHeader;
