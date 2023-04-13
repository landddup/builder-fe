import React from "react";
import PropTypes from "prop-types";

// BASE
import { ReactComponent as Logo } from "../../../images/logo.svg";
import { ReactComponent as EyeVisible } from "../../../images/eye-visible.svg";
import { ReactComponent as EyeClosed } from "../../../images/eye-closed.svg";
import { ReactComponent as Profile } from "../../../images/profile.svg";
import { ReactComponent as Logout } from "../../../images/logout.svg";

// SOCIAL
import { ReactComponent as Google } from "../../../images/google.svg";

const SvgIcon = ({ type, className, onClick }) => {
  const BASE = {
    logo: Logo,
    eyeVisible: EyeVisible,
    eyeClosed: EyeClosed,
    profile: Profile,
    logout: Logout,
  };

  const SOCIAL = {
    google: Google,
  };

  const SVG_BY_TYPE = {
    ...BASE,
    ...SOCIAL,
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
