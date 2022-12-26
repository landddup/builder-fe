import React, { useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";

const Input = ({
  value,
  valueKey,
  placeholder,
  disabled,
  errorMessage,
  onChange,
}) => {
  const id = useMemo(() => nanoid(), []);

  const handleChange = (e) => {
    const { value: newValue } = e.target;

    onChange(newValue, valueKey);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}></label>

      <input
        id={id}
        className={classNames(styles.input, {
          [styles.inputError]: !!errorMessage,
        })}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />

      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  placeholder: "",
  disabled: false,
  errorMessage: "",
};

export default Input;
