import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";

const Block = ({ className, children }) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};

Block.propTypes = {
  className: PropTypes.string,
};

Block.defaultProps = {
  className: "",
};

export default Block;
