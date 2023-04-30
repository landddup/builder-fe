import React, { useMemo, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import classNames from "classnames";

import { SvgButton } from "../";

import styles from "./index.module.scss";

const Input = ({
  className,
  value,
  valueKey,
  label,
  labelAllowed,
  placeholder,
  disabled,
  errorMessage,
  errorMessageAllowed,
  secured,
  type,
  required,
  autoFocus,
  onChange,
  onBlur,
  ...rest
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
      {labelAllowed && (
        <label htmlFor={id} className={styles.label}>
          {getLabel()}
        </label>
      )}

      <div className={styles.fieldContainer}>
        <input
          id={id}
          className={classNames(styles.field, className, {
            [styles.fieldError]: !!errorMessage,
          })}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          type={isValueHidden ? "password" : type}
          required={required}
          autoFocus={autoFocus}
          onChange={handleChange}
          onBlur={onBlur}
          {...rest}
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

      {errorMessageAllowed && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  valueKey: PropTypes.string,
  label: PropTypes.string,
  labelAllowed: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMessageAllowed: PropTypes.bool,
  secured: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  className: "",
  valueKey: "",
  label: "",
  labelAllowed: true,
  placeholder: "",
  disabled: false,
  errorMessage: "",
  errorMessageAllowed: true,
  secured: false,
  type: "default",
  required: false,
  autoFocus: false,
  onBlur: () => {},
};

export default Input;
