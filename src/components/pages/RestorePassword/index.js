import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { preparePayload } from "../../../utils/validation/helpers";
import { validateRestorePassword } from "../../../utils/validation";
import actions from "../../../actions";
import constants from "../../../utils/constants";

import { Input, Button, CustomLink } from "../../shared";

import styles from "./index.module.scss";

const RestorePassword = () => {
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

  const callRestorePassword = async ({ email }) => {
    setFetching(true);

    await dispatch(actions.session.restorePassword({ email }));

    setFetching(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = preparePayload(inputs, "value");

    validateRestorePassword({
      data: payload,
      onSuccess: callRestorePassword,
      onError: setErrors,
    });
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

      <Button label="Get new password" size="large" isLoading={fetching} />

      <div className={styles.links}>
        <CustomLink
          to={constants.routes.SIGN_UP}
          text="Need an account?"
          className={styles.link}
        />

        <CustomLink
          to={constants.routes.SIGN_IN}
          text="Already have an account?"
          className={styles.link}
        />
      </div>
    </form>
  );
};

export default RestorePassword;
