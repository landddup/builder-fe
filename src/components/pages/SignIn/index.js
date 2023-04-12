import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { preparePayload } from "../../../utils/validation/helpers";
import { validateCreateSession } from "../../../utils/validation";
import { sessionActions } from "../../../actions";
import { RESTORE_PASSWORD, SIGN_UP } from "../../../utils/constants/routes";

import Input from "../../base/Input";
import Button from "../../base/Button";
import CustomLink from "../../base/Link";
import SvgButton from "../../base/SvgButton";

import styles from "./index.module.scss";

const SignIn = () => {
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
      label: "Password",
      placeholder: "Password",
      errorMessage: "",
      name: "password",
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

  const createSession = async ({ email, password }) => {
    setFetching(true);

    await dispatch(
      sessionActions.login({
        email,
        password,
      })
    );

    setFetching(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = preparePayload(inputs, "value");

    validateCreateSession({
      data: payload,
      onSuccess: (validData) => createSession(validData),
      onError: setErrors,
    });
  };

  const loginWithGoogle = async () => {
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

      <Button label="Sign In" size="large" isLoading={fetching} />

      <div className={styles.socialButtons}>
        <SvgButton icon="google" onClick={loginWithGoogle} />
      </div>

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
