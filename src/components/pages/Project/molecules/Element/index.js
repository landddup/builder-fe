import React, { useMemo } from "react";
import PropTypes from "prop-types";

import constants from "../../../../../utils/constants";
import { DragOverContainer } from "../../../../containers";

const Element = ({ type, children, ...rest }) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[type].element,
    [type]
  );

  return (
    <DragOverContainer>
      <Component {...rest}>{children}</Component>
    </DragOverContainer>
  );
};

Element.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Element;
