import React from "react";
import PropTypes from "prop-types";

import { Element } from "../";

const Elements = ({ elements, path }) => {
  return (
    <>
      {Object.keys(elements).map((elementKey) => {
        const {
          createdAt: { seconds },
          elements: nestedElements,
        } = elements[elementKey];

        const shouldRenderElements =
          nestedElements && !!Object.keys(nestedElements).length;

        const nextPath = `${path}${!!path ? "." : ""}${elementKey}`;

        return (
          <Element
            key={seconds}
            currentNode={elements[elementKey]}
            path={nextPath}
          >
            {shouldRenderElements && (
              <Elements elements={nestedElements} path={nextPath} />
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
  path: "",
};

export default Elements;
