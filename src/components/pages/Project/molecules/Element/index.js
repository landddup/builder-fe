import React, { useMemo } from "react";
import PropTypes from "prop-types";

import constants from "../../../../../utils/constants";

import { BuilderElementContainer } from "../../../../containers";

const Element = ({ type, path, orderIndex, children, ...rest }) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[type].element,
    [type]
  );

  return (
    <BuilderElementContainer type={type} path={path} deleteAllowed>
      <Component {...rest}>{children}</Component>
    </BuilderElementContainer>
  );
};

Element.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Element;
