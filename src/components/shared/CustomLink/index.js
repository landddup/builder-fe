import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { SvgIcon } from "../";

import styles from "./index.module.scss";

const CustomLink = ({ to, text, icon, replace, className, children }) => {
  return (
    <NavLink
      to={to}
      replace={replace}
      className={(linkState) =>
        classNames(
          styles.link,
          typeof className === "function" ? className(linkState) : className
        )
      }
    >
      {icon && <SvgIcon type={icon} className={styles.icon} />}
      {text}
      {children}
    </NavLink>
  );
};

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  replace: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

CustomLink.defaultProps = {
  text: "",
  icon: "",
  replace: false,
  className: "",
};

export default CustomLink;
