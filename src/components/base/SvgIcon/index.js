import React from "react";
import PropTypes from "prop-types";

// BASE ICONS
import { ReactComponent as Logo } from "../../../images/logo.svg";
import { ReactComponent as EyeVisible } from "../../../images/eye-visible.svg";
import { ReactComponent as EyeClosed } from "../../../images/eye-closed.svg";

const SvgIcon = ({ type, className, onClick }) => {
  const BASE_ICONS = {
    logo: Logo,
    eyeVisible: EyeVisible,
    eyeClosed: EyeClosed,
  };

  const SVG_BY_TYPE = {
    ...BASE_ICONS,
  };

  const CustomSvg = SVG_BY_TYPE[type] || "svg";

  return <CustomSvg className={className} onClick={onClick} />;
};

SvgIcon.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

SvgIcon.defaultProps = {
  type: "",
  className: "",
  onClick: () => {},
};

export default SvgIcon;
