import React, { useRef, useState } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const DragOverContainer = ({ children }) => {
  const containerRef = useRef();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    if (e.target === containerRef.current.firstChild) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    if (isDragOver) {
      setIsDragOver(false);
    }
  };

  const handleDrop = () => {
    if (isDragOver) {
      handleDragLeave();
    }
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, {
        [styles.containerActive]: isDragOver,
      })}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}

      {/* <div
        className={classNames(styles.background, {
          [styles.backgroundActive]: isDragOver,
        })}
      /> */}
    </div>
  );
};

export default DragOverContainer;
