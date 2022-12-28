import React, { useState } from "react";

import { validateSignUp } from "../../../utils/validation";
import { RESTORE_PASSWORD, SIGN_IN } from "../../../utils/constants/routes";

import Input from "../../base/Input";
import Button from "../../base/Button";

import styles from "./index.module.scss";
import CustomLink from "../../base/Link";

const SignUp = () => {
  const [fetching, setFetching] = useState(false);
  const [inputs, setInputs] = useState({
    email: { value: "", placeholder: "Email", errorMessage: "", name: "email" },
    password: {
      value: "",
      placeholder: "Password",
      errorMessage: "",
      name: "password",
      secured: true,
    },
    passwordConfirm: {
      value: "",
      placeholder: "Confirm password",
      errorMessage: "",
      name: "passwordConfirm",
      secured: true,
    },
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

    validateSignUp({
      data: {
        email: inputs.email.value,
        password: inputs.password.value,
        passwordConfirm: inputs.passwordConfirm.value,
      },
      onSuccess: () => setFetching(true),
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

      <Input
        valueKey="passwordConfirm"
        onChange={handleInputChange}
        {...inputs.passwordConfirm}
      />

      <Button label="Sign Up" size="large" isLoading={fetching} />

      <div className={styles.links}>
        <CustomLink
          to={SIGN_IN}
          text="Already have an account?"
          className={styles.link}
        />

        <CustomLink
          to={RESTORE_PASSWORD}
          text="Restore password"
          className={styles.link}
        />
      </div>
    </form>
  );
};

export default SignUp;
