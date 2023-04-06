import { ValidateValues, ErrorValues } from "../../../../hooks/useForm";

const USERNAME_REGEX = /^[a-zA-Z0-9._]{3,30}$/;

export const formValidationRules = (values: ValidateValues) => {
  let errors: ErrorValues = {};

  if (values.username) {
    if (!USERNAME_REGEX.test(values.username)) {
      errors.username =
        "Your username must only have between 3 and 30 letters, numbers, periods or underscores.";
    }
  } else if (values.username === "") {
    errors.username = "Please enter a username";
  }
  return errors;
};
