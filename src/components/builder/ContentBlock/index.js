import React from "react";

import styles from "./index.module.scss";

const ContentBlock = ({ children }) => {
  return (
    <div className={styles.container}>
      {children ? (
        children
      ) : (
        <p className={styles.paragraph}>drag & drop items here</p>
      )}
    </div>
  );
};

export default ContentBlock;
