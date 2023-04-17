import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import constants from "../../../utils/constants";

import { CustomLink, SvgIcon } from "../../shared";

import styles from "./index.module.scss";

const Logo = ({ className }) => {
  return (
    <CustomLink
      to={constants.routes.ROOT}
      className={classNames(styles.link, className)}
    >
      <SvgIcon type="logo" />
    </CustomLink>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: "",
};

export default Logo;
