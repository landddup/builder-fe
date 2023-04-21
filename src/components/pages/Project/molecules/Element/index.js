import React, { useMemo } from "react";
import PropTypes from "prop-types";

import constants from "../../../../../utils/constants";
import { DragOverContainer } from "../../../../containers";

const Element = ({ type, path, dropAllowed, children, ...rest }) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[type].element,
    [type]
  );

  return (
    <DragOverContainer path={path} dropAllowed={dropAllowed}>
      <Component {...rest}>{children}</Component>
    </DragOverContainer>
  );
};

Element.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  dropAllowed: PropTypes.bool.isRequired,
};

export default Element;
