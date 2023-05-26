import React, { useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";

const Text = ({ currentNode }) => {
  const Component = useMemo(
    () => currentNode.component,
    [currentNode.component]
  );

  return <Component className={styles.text}>{currentNode.content}</Component>;
};

Text.propTypes = {
  currentNode: PropTypes.object,
};

Text.defaultProps = {
  currentNode: "",
};

export default Text;
