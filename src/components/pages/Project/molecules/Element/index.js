import React, { useMemo } from "react";
import PropTypes from "prop-types";

import constants from "../../../../../utils/constants";

import {
  DragOverContainer,
  ElementSettingsContainer,
} from "../../../../containers";

const Element = ({ type, path, children, ...rest }) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[type].element,
    [type]
  );

  return (
    <ElementSettingsContainer path={path} type={type}>
      <DragOverContainer path={path} type={type}>
        <Component {...rest}>{children}</Component>
      </DragOverContainer>
    </ElementSettingsContainer>
  );
};

Element.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Element;
