import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { preparePayload } from "../../../utils/validation/helpers";

import {
  validateUser,
  validateUserWithPassword,
} from "../../../utils/validation";

import { PROVIDERS } from "../../../utils/constants/firebase";
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
    name: "email",
    required: true,
  },
  phoneNumber: {
    label: "Phone Number",
    placeholder: "Phone Number",
    type: "tel",
    name: "phone",
  },
};

const prepareInputs = (user, providerId) => {
  const output = {};

  Object.keys(ALLOWED_USER_FIELDS).forEach((fieldKey) => {
    output[fieldKey] = {
      ...ALLOWED_USER_FIELDS[fieldKey],
      value: user[fieldKey] || "",
      errorMessage: "",
    };
  });

  if (providerId === PROVIDERS.PASSWORD) {
    output[PROVIDERS.PASSWORD] = {
      value: "",
      label: "Current password",
      placeholder: "Current password",
      name: "password",
      autoComplete: "new-password",
      secured: true,
    };
  }

  return output;
};

const User = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.session);

  const { providerId } = useMemo(
    () => currentSession.providerData[0],
    [currentSession]
  );

  const [inputs, setInputs] = useState(
    prepareInputs(currentSession, providerId)
  );
  const [fetching, setFetching] = useState(false);

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

  const getCurrentUser = async (validInputs) => {
    let currentUser;

    if (providerId === PROVIDERS.PASSWORD) {
      currentUser = await dispatch(
        sessionActions.reauthenticateWithPassword(validInputs)
      );
    }

    if (providerId === PROVIDERS.GOOGLE) {
      currentUser = await dispatch(sessionActions.reauthenticateWithGoogle());
    }

    return currentUser;
  };

  const updateCurrentUser = async (validInputs) => {
    setFetching(true);

    try {
      const currentUser = await getCurrentUser(validInputs);

      if (!currentUser) {
        return;
      }

      await dispatch(sessionActions.updateUser(validInputs));
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = preparePayload(inputs, "value");
    const validate =
      PROVIDERS.PASSWORD in payload ? validateUserWithPassword : validateUser;

    validate({
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

        <div className={styles.button}>
          <Button
            type="submit"
            size="large"
            label="Update user"
            isLoading={fetching}
            className={styles.button}
          />
        </div>
      </form>
    </div>
  );
};

export default User;
