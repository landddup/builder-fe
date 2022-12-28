import React from "react";
import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";

const LoadingIndicator = ({
  width,
  height,
  color,
  secondaryColor,
  strokeWidth,
  strokeWidthSecondary,
}) => {
  return (
    <Oval
      ariaLabel="oval-loading"
      width={width}
      height={height}
      color={color}
      secondaryColor={secondaryColor}
      strokeWidth={strokeWidth}
      strokeWidthSecondary={strokeWidthSecondary}
    />
  );
};

LoadingIndicator.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  secondaryColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeWidthSecondary: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  width: 20,
  height: 20,
  color: "#ffffff",
  secondaryColor: "#ffffff",
  strokeWidth: 4,
  strokeWidthSecondary: 4,
};

export default LoadingIndicator;
