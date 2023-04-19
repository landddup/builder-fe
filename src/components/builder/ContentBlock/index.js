import React from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const ContentBlock = ({ children }) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.containerEmpty]: !children,
      })}
    >
      {children ? (
        children
      ) : (
        <p className={styles.paragraph}>drag & drop items here</p>
      )}
    </div>
  );
};

export default ContentBlock;
