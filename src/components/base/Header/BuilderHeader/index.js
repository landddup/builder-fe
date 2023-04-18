import React from "react";

import constants from "../../../../utils/constants";

import { CustomLink } from "../../../shared";

import styles from "./index.module.scss";

const BuilderHeader = () => {
  return (
    <header className={styles.container}>
      <CustomLink
        to={constants.routes.ROOT}
        icon="arrowLeft"
        text="ALL PROJECTS"
        replace
      />
    </header>
  );
};

export default BuilderHeader;
