import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { sessionActions } from "../../../actions";
import { validateCreateSession } from "../../../utils/validation";
import { RESTORE_PASSWORD, SIGN_UP } from "../../../utils/constants/routes";

import Input from "../../base/Input";
import Button from "../../base/Button";
import CustomLink from "../../base/Link";

import styles from "./index.module.scss";

const SignIn = () => {
  const dispatch = useDispatch();
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

  const createSession = async ({ email, password }) => {
    setFetching(true);

    try {
      await dispatch(
        sessionActions.login({
          email,
          password,
        })
      );
    } catch (error) {
      console.warn(error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateCreateSession({
      data: { email: inputs.email.value, password: inputs.password.value },
      onSuccess: (validData) => createSession(validData),
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

      <Button label="Login" size="large" isLoading={fetching} />

      <div className={styles.links}>
        <CustomLink
          to={SIGN_UP}
          text="Need an account?"
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

export default SignIn;
