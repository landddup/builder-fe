import React, { useMemo } from "react";
import PropTypes from "prop-types";

import constants from "../../../../../utils/constants";

import { BuilderElementContainer } from "../../../../containers";

const Element = ({ currentNode, path, children }) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[currentNode.type].element,
    [currentNode]
  );

  return (
    <BuilderElementContainer
      currentNode={currentNode}
      path={path}
      deleteAllowed
    >
      <Component {...currentNode}>{children}</Component>
    </BuilderElementContainer>
  );
};

Element.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Element;
