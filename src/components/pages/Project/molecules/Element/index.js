import React, { useMemo } from "react";
import PropTypes from "prop-types";

import constants from "../../../../../utils/constants";

import {
  DragOverContainer,
  ElementSettingsContainer,
} from "../../../../containers";

const Element = ({
  type,
  path,
  dropAllowed,
  deleteAllowed,
  children,
  ...rest
}) => {
  const Component = useMemo(
    () => constants.builder.ELEMENTS_BY_TYPES[type].element,
    [type]
  );

  return (
    <ElementSettingsContainer
      path={path}
      dropAllowed={dropAllowed}
      deleteAllowed={deleteAllowed}
    >
      <DragOverContainer path={path} dropAllowed={dropAllowed}>
        <Component {...rest}>{children}</Component>
      </DragOverContainer>
    </ElementSettingsContainer>
  );
};

Element.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  dropAllowed: PropTypes.bool.isRequired,
  deleteAllowed: PropTypes.bool.isRequired,
};

export default Element;
