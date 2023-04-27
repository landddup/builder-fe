import React from "react";
import PropTypes from "prop-types";

// BASE
import { ReactComponent as Logo } from "../../../images/logo.svg";
import { ReactComponent as EyeVisible } from "../../../images/eye-visible.svg";
import { ReactComponent as EyeClosed } from "../../../images/eye-closed.svg";
import { ReactComponent as Profile } from "../../../images/profile.svg";
import { ReactComponent as Logout } from "../../../images/logout.svg";
import { ReactComponent as XCircle } from "../../../images/x-circle.svg";
import { ReactComponent as Check } from "../../../images/check.svg";

// SOCIAL
import { ReactComponent as Google } from "../../../images/google.svg";

// BUILDER
import { ReactComponent as GridPlus } from "../../../images/grid-plus.svg";
import { ReactComponent as ArrowLeft } from "../../../images/arrow-left.svg";
import { ReactComponent as Cross } from "../../../images/cross.svg";
import { ReactComponent as ChevronUp } from "../../../images/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../../../images/chevron-down.svg";

// BUILDER MENU
import { ReactComponent as GridGroup } from "../../../images/grid-group.svg";
import { ReactComponent as Text } from "../../../images/text.svg";

const SvgIcon = ({ type, className, onClick }) => {
  const BASE = {
    logo: Logo,
    eyeVisible: EyeVisible,
    eyeClosed: EyeClosed,
    profile: Profile,
    logout: Logout,
    xcircle: XCircle,
    check: Check,
  };

  const SOCIAL = {
    google: Google,
  };

  const BUILDER = {
    gridPlus: GridPlus,
    arrowLeft: ArrowLeft,
    cross: Cross,
    chevronUp: ChevronUp,
    chevronDown: ChevronDown,
  };

  const BUILDER_MENU = {
    gridGroup: GridGroup,
    text: Text,
  };

  const SVG_BY_TYPE = {
    ...BASE,
    ...SOCIAL,
    ...BUILDER,
    ...BUILDER_MENU,
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
