import React, { useMemo } from "react";
import PropTypes from "prop-types";
import constants from "../../../../../utils/constants";

const Element = ({ type }) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[type].element,
    [type]
  );

  return <Component />;
};

Element.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Element;
