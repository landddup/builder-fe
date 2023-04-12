import React, { useMemo, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import classNames from "classnames";

import SvgButton from "../SvgButton";

import styles from "./index.module.scss";

const Input = ({
  value,
  valueKey,
  label,
  placeholder,
  disabled,
  errorMessage,
  secured,
  type,
  required,
  onChange,
}) => {
  const [isValueHidden, setIsValueHidden] = useState(secured);

  const id = useMemo(() => nanoid(), []);

  const handleChange = (e) => {
    const { value: newValue } = e.target;

    onChange(newValue, valueKey);
  };

  const getLabel = () => {
    switch (true) {
      case !!label && required: {
        return (
          <>
            {`${label} `}
            <span className={styles.asterisk}>*</span>
          </>
        );
      }

      case !!label: {
        return label;
      }

      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {getLabel()}
      </label>

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
          required={required}
          onChange={handleChange}
        />

        {secured && (
          <SvgButton
            icon={isValueHidden ? "eyeVisible" : "eyeClosed"}
            size="small"
            className={styles.icon}
            onClick={() => setIsValueHidden((prev) => !prev)}
          />
        )}
      </div>

      <span className={styles.errorMessage}>{errorMessage}</span>
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  valueKey: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  secured: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  valueKey: "",
  label: "",
  placeholder: "",
  disabled: false,
  errorMessage: "",
  secured: false,
  type: "default",
  required: false,
};

export default Input;
