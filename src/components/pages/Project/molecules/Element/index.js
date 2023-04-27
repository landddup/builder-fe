import React, { useMemo } from "react";
import PropTypes from "prop-types";

import constants from "../../../../../utils/constants";

import { BuilderElementContainer } from "../../../../containers";

const Element = ({ currentNode, elements, path, children }) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[currentNode.type].element,
    [currentNode]
  );

  return (
    <BuilderElementContainer
      currentNode={currentNode}
      elements={elements}
      path={path}
      deleteAllowed
    >
      <Component {...currentNode}>{children}</Component>
    </BuilderElementContainer>
  );
};

Element.propTypes = {
  currentNode: PropTypes.object.isRequired,
  elements: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default Element;
