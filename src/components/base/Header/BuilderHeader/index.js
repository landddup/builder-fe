import React from "react";

import { ROOT } from "../../../../utils/constants/routes";

import CustomLink from "../../../shared/Link";

import styles from "./index.module.scss";

const BuilderHeader = () => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <CustomLink
          className={styles.link}
          text="ALL PROJECTS"
          icon="arrowLeft"
          to={ROOT}
          replace
        />
      </div>
    </header>
  );
};

export default BuilderHeader;
