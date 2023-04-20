import React, { useMemo } from "react";
import PropTypes from "prop-types";

const Text = ({ component, content }) => {
  const Component = useMemo(() => component, [component]);

  return <Component>{content ? content : "Text block"}</Component>;
};

Text.propTypes = {
  component: PropTypes.string.isRequired,
  content: PropTypes.string,
};

Text.defaultProps = {
  content: "",
};

export default Text;
