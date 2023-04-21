import React from "react";
import PropTypes from "prop-types";

import { Element } from "../";

const Elements = ({ elements, path }) => {
  return (
    <>
      {Object.keys(elements).map((elementKey) => {
        const {
          type,
          createdAt: { seconds },
          elements: nestedElements,
          dropAllowed,
          deleteAllowed = true,
          ...rest
        } = elements[elementKey];

        const shouldRenderElements =
          nestedElements && !!Object.keys(nestedElements).length;

        const elementPath = `${path}.${elementKey}.elements`;

        return (
          <Element
            key={seconds}
            type={type}
            path={elementPath}
            dropAllowed={dropAllowed}
            deleteAllowed={deleteAllowed}
            {...rest}
          >
            {shouldRenderElements && (
              <Elements elements={nestedElements} path={elementPath} />
            )}
          </Element>
        );
      })}
    </>
  );
};

Elements.propTypes = {
  elements: PropTypes.object,
  path: PropTypes.string,
};

Elements.defaultProps = {
  elements: {},
  path: "elements",
};

export default Elements;
