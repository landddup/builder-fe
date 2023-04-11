import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { validateRestorePassword } from "../../../utils/validation";
import { sessionActions } from "../../../actions";
import { SIGN_IN, SIGN_UP } from "../../../utils/constants/routes";

import Input from "../../base/Input";
import Button from "../../base/Button";
import CustomLink from "../../base/Link";

import styles from "./index.module.scss";

const RestorePassword = () => {
  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(false);
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

  const callRestorePassword = async () => {
    setFetching(true);

    await dispatch(sessionActions.restorePassword(inputs.email.value));

    setFetching(false);
    setInputs((prev) => ({ ...prev, email: { ...prev.email, value: "" } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateRestorePassword({
      data: { email: inputs.email.value },
      onSuccess: callRestorePassword,
      onError: (errors) => setErrors(errors),
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input valueKey="email" onChange={handleInputChange} {...inputs.email} />

      <Button label="Get new password" size="large" isLoading={fetching} />

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
