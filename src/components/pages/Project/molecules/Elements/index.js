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
        } = element;

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
