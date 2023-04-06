import { ErrorValues, ValidateValues } from "../../../../hooks/useForm";

const CODE_REGEX = /^[0-9]{6}$/;

export const formValidationRules = (values: ValidateValues) => {
  let errors: ErrorValues = {};
  if (!values.passcode) {
    errors.passcode = "Please enter a passcode";
  } else if (!CODE_REGEX.test(`${values.passcode}`)) {
    errors.passcode = "Please enter a valid passcode.";
  }
  return errors;
};
