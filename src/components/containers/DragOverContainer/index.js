import React, { useState } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const DragOverContainer = ({ children }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerActive]: isDragOver,
      })}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragLeave}
    >
      {children}

      <div
        className={classNames(styles.background, {
          [styles.backgroundActive]: isDragOver,
        })}
      />
    </div>
  );
};

export default DragOverContainer;
