import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./index.module.scss";

const CustomLink = ({ to, text, className, children }) => {
  return (
    <NavLink
      to={to}
      className={(linkState) =>
        classNames(
          styles.link,
          typeof className === "function" ? className(linkState) : className
        )
      }
    >
      {text}
      {children}
    </NavLink>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

CustomLink.defaultProps = {
  text: "",
  className: "",
};

export default CustomLink;
