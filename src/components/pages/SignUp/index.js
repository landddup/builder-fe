import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { preparePayload } from "../../../utils/validation/helpers";
import { validateSignUp } from "../../../utils/validation";
import { sessionActions } from "../../../actions";
import { RESTORE_PASSWORD, SIGN_IN } from "../../../utils/constants/routes";

import Input from "../../base/Input";
import Button from "../../base/Button";
import CustomLink from "../../base/Link";
import SvgButton from "../../base/SvgButton";

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
      type: "password",
      required: true,
      secured: true,
    },
    passwordConfirm: {
      value: "",
      label: "Confirm password",
      placeholder: "Confirm password",
      errorMessage: "",
      name: "passwordConfirm",
      type: "password",
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
      sessionActions.register({
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
    await dispatch(sessionActions.loginWithGoogle());
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
