import React from "react";
import PropTypes from "prop-types";

import { Element } from "../";

const Elements = ({ elements }) => {
  return (
    <div>
      {Object.values(elements).map((element) => {
        const {
          type,
          createdAt: { seconds },
          elements: nestedElements,
          ...rest
        } = element;

        const shouldRenderRecursively =
          nestedElements && !!Object.keys(nestedElements).length;

        return (
          <Element key={seconds} type={type} {...rest}>
            {shouldRenderRecursively && <Elements elements={nestedElements} />}
          </Element>
        );
      })}
    </div>
  );
};

Elements.propTypes = {
  elements: PropTypes.object,
};

Elements.defaultProps = {
  elements: {},
};

export default Elements;
