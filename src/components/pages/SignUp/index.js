import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { preparePayload } from "../../../utils/validation/helpers";
import { validateSignUp } from "../../../utils/validation";
import actions from "../../../actions";
import constants from "../../../utils/constants";

import { Input, Button, CustomLink, SvgButton } from "../../shared";

import styles from "./index.module.scss";

const SignUp = () => {
  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(false);
  const [inputs, setInputs] = useState({
    email: {
      value: "",
      label: "Email",
      placeholder: "Email",
      errorMessage: "",
      name: "email",
      type: "email",
      required: true,
    },
    password: {
      value: "",
      placeholder: "Password",
      label: "Password",
      errorMessage: "",
      name: "password",
      required: true,
      secured: true,
    },
    passwordConfirm: {
      value: "",
      label: "Confirm password",
      placeholder: "Confirm password",
      errorMessage: "",
      name: "passwordConfirm",
      required: true,
      secured: true,
    },
  });

  const handleInputChange = (value, valueKey) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: {
        ...prev[valueKey],
        errorMessage: "",
        value,
      },
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

  const createUser = async ({ email, password }) => {
    setFetching(true);

    await dispatch(
      actions.session.register({
        email,
        password,
      })
    );

    setFetching(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = preparePayload(inputs, "value");

    validateSignUp({
      data: payload,
      onSuccess: (validData) => createUser(validData),
      onError: setErrors,
    });
  };

  const signUpWithGoogle = async () => {
    await dispatch(actions.session.loginWithGoogle());
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {Object.keys(inputs).map((inputKey) => {
        return (
          <Input
            key={inputKey}
            valueKey={inputKey}
            onChange={handleInputChange}
            disabled={fetching}
            {...inputs[inputKey]}
          />
        );
      })}

      <Button label="Sign Up" size="large" isLoading={fetching} />

      <div className={styles.socialButtons}>
        <SvgButton icon="google" onClick={signUpWithGoogle} />
      </div>

      <div className={styles.links}>
        <CustomLink
          to={constants.routes.SIGN_IN}
          text="Already have an account?"
          className={styles.link}
        />

        <CustomLink
          to={constants.routes.RESTORE_PASSWORD}
          text="Restore password"
          className={styles.link}
        />
      </div>
    </form>
  );
};

export default SignUp;
