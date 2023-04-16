import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { ROOT } from "../../../utils/constants/routes";

import CustomLink from "../../shared/Link";
import SvgIcon from "../../shared/SvgIcon";

import styles from "./index.module.scss";

const Logo = ({ className }) => {
  return (
    <CustomLink to={ROOT} className={classNames(styles.link, className)}>
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
