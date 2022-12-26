import React, { useState } from "react";

import { validateCreateSession } from "../../../utils/validation";

import Input from "../../base/Input";
import Button from "../../base/Button";

import styles from "./index.module.scss";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: { value: "", placeholder: "Email", errorMessage: "" },
    password: { value: "", placeholder: "Password", errorMessage: "" },
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

    validateCreateSession({
      data: { email: inputs.email.value, password: inputs.password.value },
      onSuccess: (validData) => console.log(validData),
      onError: (errors) => setErrors(errors),
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input valueKey="email" onChange={handleInputChange} {...inputs.email} />

      <Input
        valueKey="password"
        onChange={handleInputChange}
        {...inputs.password}
      />

      <Button label="Login" />
    </form>
  );
};

export default SignIn;
