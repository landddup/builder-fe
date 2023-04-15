import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Input from "../../../Input";
import Button from "../../../Button";

import styles from "./index.module.scss";

const FormModal = ({
  inputs,
  submitButton,
  cancelButton,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const [internalInputs, setInternalInputs] = useState(inputs);

  const handleInputChange = (value, valueKey) => {
    setInternalInputs((prev) => ({
      ...prev,
      [valueKey]: {
        ...prev[valueKey],
        errorMessage: "",
        value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(internalInputs);
  };

  useEffect(() => setInternalInputs(inputs), [inputs]);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          {Object.keys(internalInputs).map((inputKey) => {
            return (
              <Input
                key={inputKey}
                valueKey={inputKey}
                onChange={handleInputChange}
                {...internalInputs[inputKey]}
              />
            );
          })}
        </div>

        <div className={styles.buttons}>
          <Button
            className={styles.cancecButton}
            label={cancelButton}
            variant="outlined"
            type="button"
            disabled={isLoading}
            onClick={onCancel}
          />

          <Button
            className={styles.submitButton}
            label={submitButton}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

FormModal.propTypes = {
  inputs: PropTypes.object,
  submitButton: PropTypes.string,
  cancelButton: PropTypes.string,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

FormModal.defaultProps = {
  inputs: {},
  submitButton: "Submit",
  cancelButton: "Cancel",
  isLoading: false,
  onSubmit: () => {},
  onCancel: () => {},
};

export default FormModal;
