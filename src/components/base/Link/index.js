import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./index.module.scss";

const CustomLink = ({ to, text, className, children }) => {
  return (
    <Link to={to} className={classNames(styles.link, className)}>
      {text}
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

CustomLink.defaultProps = {
  text: "",
  className: "",
};

export default CustomLink;
