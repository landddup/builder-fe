import React from "react";
import PropTypes from "prop-types";

import { Element } from "../";

const Elements = ({ elements }) => {
  return (
    <>
      {Object.keys(elements).map((elementKey) => {
        const { id, elements: nestedElements } = elements[elementKey];

        const shouldRenderElements =
          nestedElements && !!Object.keys(nestedElements).length;

        return (
          <Element
            key={id}
            elements={elements}
            currentNode={elements[elementKey]}
          >
            {shouldRenderElements && <Elements elements={nestedElements} />}
          </Element>
        );
      })}
    </>
  );
};

Elements.propTypes = {
  elements: PropTypes.object,
};

Elements.defaultProps = {
  elements: {},
};

export default Elements;
