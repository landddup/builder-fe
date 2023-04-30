import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import { Input } from "../../shared";

import styles from "./index.module.scss";

const Text = ({ currentNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(currentNode.content);

  const Component = useMemo(
    () => currentNode.component,
    [currentNode.component]
  );

  const handleBeginEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Input
        className={styles.text}
        value={input}
        onChange={handleInputChange}
        onBlur={handleSubmit}
        labelAllowed={false}
        errorMessageAllowed={false}
        autoFocus
      />
    );
  }

  return (
    <Component className={styles.text} onClick={handleBeginEdit}>
      {input}
    </Component>
  );
};

Text.propTypes = {
  currentNode: PropTypes.object,
};

Text.defaultProps = {
  currentNode: "",
};

export default Text;
