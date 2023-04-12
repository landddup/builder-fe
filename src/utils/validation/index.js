import LIVR from "livr";
import extraRules from "livr-extra-rules";

import rules from "./rules";
import { NOT_EQUAL_ERRORS, REQUIRED_ERRORS, TOO_SHORT_ERRORS } from "./errors";

LIVR.Validator.registerDefaultRules(extraRules);
LIVR.Validator.defaultAutoTrim(true);

function validate({ rule, data, onSuccess, onError }) {
  const validator = new LIVR.Validator(rule);
  const validData = validator.validate(data);

  if (validData) {
    if (onSuccess) onSuccess(validData);
  } else {
    const decodedErrors = decodeErrorObject(validator.getErrors());

    if (onError) {
      onError(decodedErrors);
    }
  }
}

export function validateCreateSession(args) {
  return validate({ rule: rules.createSession, ...args });
}

export function validateSignUp(args) {
  return validate({ rule: rules.signUp, ...args });
}

export function validateRestorePassword(args) {
  return validate({ rule: rules.restorePassword, ...args });
}

export function validateUser(args) {
  return validate({ rule: rules.user, ...args });
}

export function mapErrors(error) {
  const mapedErrors = {};

  error.errors?.forEach(
    (element) => (mapedErrors[element.field] = element.message)
  );

  return mapedErrors;
}

function decodeErrorObject(errors) {
  const decodedErrors = { ...errors };

  for (const field in decodedErrors) {
    if (decodedErrors.hasOwnProperty(field)) {
      const errorField = field.replace("data/", "");

      decodedErrors[errorField] = decodeErrorCode(
        decodedErrors[field],
        errorField
      );
    }
  }

  return decodedErrors;
}

export function decodeErrorCode(code, field = "") {
  switch (code) {
    case "REQUIRED": {
      const errorMessage = field && REQUIRED_ERRORS[field];

      return errorMessage || "Value is required";
    }

    case "TOO_SHORT": {
      const errorMessage = field && TOO_SHORT_ERRORS[field];

      return errorMessage || "Value is too short";
    }

    case "WRONG_EMAIL": {
      return "A valid email is required.";
    }

    case "FIELDS_NOT_EQUAL": {
      const errorMessage = field && NOT_EQUAL_ERRORS[field];

      return errorMessage || "Value is invalid";
    }

    default: {
      return code;
    }
  }
}
