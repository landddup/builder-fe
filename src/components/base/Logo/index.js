import React from "react";
import PropTypes from "prop-types";

import { ROOT } from "../../../utils/constants/routes";

import CustomLink from "../Link";
import SvgIcon from "../SvgIcon";

const Logo = ({ className }) => {
  return (
    <CustomLink to={ROOT} className={className}>
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
