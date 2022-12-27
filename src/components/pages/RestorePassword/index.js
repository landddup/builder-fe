import React, { useState } from "react";

import { validateRestorePassword } from "../../../utils/validation";
import { SIGN_IN, SIGN_UP } from "../../../utils/constants/routes";

import Input from "../../base/Input";
import Button from "../../base/Button";

import styles from "./index.module.scss";
import CustomLink from "../../base/Link";

const RestorePassword = () => {
  const [inputs, setInputs] = useState({
    email: { value: "", placeholder: "Email", errorMessage: "", name: "email" },
  });

  const handleInputChange = (value, valueKey) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], value, errorMessage: "" },
    }));
  };

  const setErrors = (errors) => {
    setInputs((prev) => {
      const output = { ...prev };

      Object.keys(errors).forEach((errorKey) => {
        output[errorKey].errorMessage = errors[errorKey];
      });

      return output;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateRestorePassword({
      data: { email: inputs.email.value },
      onSuccess: (validData) => console.log(validData),
      onError: (errors) => setErrors(errors),
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input valueKey="email" onChange={handleInputChange} {...inputs.email} />

      <Button label="Get new password" size="large" />

      <div className={styles.links}>
        <CustomLink
          to={SIGN_UP}
          text="Need an account?"
          className={styles.link}
        />

        <CustomLink
          to={SIGN_IN}
          text="Already have an account?"
          className={styles.link}
        />
      </div>
    </form>
  );
};

export default RestorePassword;
