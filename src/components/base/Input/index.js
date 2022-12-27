import React, { useMemo, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";
import SvgIcon from "../SvgIcon";

const Input = ({
  value,
  valueKey,
  placeholder,
  disabled,
  errorMessage,
  secured,
  type,
  onChange,
}) => {
  const [isValueHidden, setIsValueHidden] = useState(secured);

  const id = useMemo(() => nanoid(), []);

  const handleChange = (e) => {
    const { value: newValue } = e.target;

    onChange(newValue, valueKey);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}></label>

      <div className={styles.fieldContainer}>
        <input
          id={id}
          className={classNames(styles.field, {
            [styles.fieldError]: !!errorMessage,
          })}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          type={isValueHidden ? "password" : type}
          onChange={handleChange}
        />

        {secured && (
          <div className={styles.iconContainer}>
            <SvgIcon
              type={isValueHidden ? "eyeVisible" : "eyeClosed"}
              className={styles.icon}
              onClick={() => setIsValueHidden((prev) => !prev)}
            />
          </div>
        )}
      </div>

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
  secured: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  placeholder: "",
  disabled: false,
  errorMessage: "",
  secured: false,
  type: "default",
};

export default Input;
