import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { preparePayload } from "../../../utils/validation/helpers";
import { validateUser } from "../../../utils/validation";
import { sessionActions } from "../../../actions";

import Input from "../../base/Input";
import Button from "../../base/Button";

import styles from "./index.module.scss";

const ALLOWED_USER_FIELDS = {
  displayName: {
    label: "Display name",
    placeholder: "Display name",
  },
  email: {
    label: "Email",
    placeholder: "Email",
    type: "email",
    required: true,
  },
};

const prepareInputs = (user) => {
  const output = {};

  Object.keys(ALLOWED_USER_FIELDS).forEach((fieldKey) => {
    output[fieldKey] = {
      ...ALLOWED_USER_FIELDS[fieldKey],
      value: user[fieldKey] || "",
      errorMessage: "",
    };
  });

  return output;
};

const User = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.session);

  const [inputs, setInputs] = useState(prepareInputs(currentSession));
  const [fetching, setFetching] = useState(false);

  console.log(currentSession);

  const handleInputChange = (value, valueKey) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], errorMessage: "", value },
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

  const updateCurrentUser = async (validInputs) => {
    setFetching(true);

    await dispatch(sessionActions.updateUser(validInputs));

    setFetching(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = preparePayload(inputs, "value");

    validateUser({
      data: payload,
      onSuccess: updateCurrentUser,
      onError: setErrors,
    });
  };

  const renderVirifyEmailButton = () => {
    return <div>{/* <p>Email not verified</p> */}</div>;
  };

  return (
    <div>
      <h1>User Info</h1>

      {!currentSession.isEmailVerified && renderVirifyEmailButton()}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
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
        </div>

        <Button
          type="submit"
          size="large"
          label="Update user"
          isLoading={fetching}
          className={styles.button}
        />
      </form>
    </div>
  );
};

export default User;
