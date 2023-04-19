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
        } = element;

        const shouldRenderRecursively =
          nestedElements && !!Object.keys(nestedElements).length;

        if (shouldRenderRecursively) {
          return (
            <Element key={seconds}>
              <Elements elements={nestedElements} />
            </Element>
          );
        }

        return <Element key={seconds} type={type} />;
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
