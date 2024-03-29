import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { preparePayload } from "../../../utils/validation/helpers";

import {
  validateProfile,
  validateProfileWithPassword,
} from "../../../utils/validation";

import constants from "../../../utils/constants";
import actions from "../../../actions";

import { Block } from "../../base";
import { SvgIcon, Button, Input } from "../../shared";

import styles from "./index.module.scss";

const ALLOWED_PROFILE_FIELDS = {
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
};

const prepareInputs = (profile, providerId) => {
  const output = {};

  Object.keys(ALLOWED_PROFILE_FIELDS).forEach((fieldKey) => {
    output[fieldKey] = {
      ...ALLOWED_PROFILE_FIELDS[fieldKey],
      value: profile[fieldKey] || "",
      errorMessage: "",
    };
  });

  if (providerId === constants.firebase.PROVIDERS.PASSWORD) {
    output[constants.firebase.PROVIDERS.PASSWORD] = {
      value: "",
      label: "Current password",
      placeholder: "Current password",
      name: "password",
      secured: true,
    };
  }

  return output;
};

const Profile = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.session);

  const { providerId } = useMemo(
    () => currentSession.providerData[0],
    [currentSession]
  );

  const [inputs, setInputs] = useState(
    prepareInputs(currentSession, providerId)
  );
  const [fetching, setFetching] = useState({
    profile: false,
    email: false,
  });

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

  const updateCurrentProfile = async (validInputs) => {
    setFetching((prev) => ({ ...prev, profile: true }));

    await dispatch(actions.session.updateProfile(validInputs));

    setFetching((prev) => ({ ...prev, profile: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = preparePayload(inputs, "value");
    const validate =
      constants.firebase.PROVIDERS.PASSWORD in payload
        ? validateProfileWithPassword
        : validateProfile;

    validate({
      data: payload,
      onSuccess: updateCurrentProfile,
      onError: setErrors,
    });
  };

  const verifyEmail = async () => {
    setFetching((prev) => ({ ...prev, email: true }));

    await dispatch(actions.session.verifyEmail(currentSession));

    setFetching((prev) => ({ ...prev, email: false }));
  };

  const renderEmailVerificationContent = () => {
    const { emailVerified } = currentSession;

    if (emailVerified) {
      return (
        <div className={styles.completionItem}>
          <div className={styles.completionTextContainer}>
            <SvgIcon type="check" className={styles.completionIcon} />

            <p className={styles.completionText}>Email verified</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.completionItem}>
        <div className={styles.completionTextContainer}>
          <SvgIcon type="xcircle" className={styles.completionIcon} />

          <p className={styles.completionText}>Email not verified</p>
        </div>

        <Button
          label="Send verification link"
          size="small"
          variant="outlined"
          isLoading={fetching.email}
          onClick={verifyEmail}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Block title="Profile completion" stickyHeader>
        <div className={styles.content}>{renderEmailVerificationContent()}</div>
      </Block>

      <Block title="Profile info" stickyHeader>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.content}>
            {Object.keys(inputs).map((inputKey) => {
              return (
                <Input
                  key={inputKey}
                  valueKey={inputKey}
                  onChange={handleInputChange}
                  disabled={fetching.profile}
                  {...inputs[inputKey]}
                />
              );
            })}
          </div>

          <div className={styles.button}>
            <Button
              type="submit"
              label="Update profile"
              isLoading={fetching.profile}
            />
          </div>
        </form>
      </Block>
    </div>
  );
};

export default Profile;
