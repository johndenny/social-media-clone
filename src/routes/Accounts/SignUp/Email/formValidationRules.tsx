import { ErrorValues, ValidateValues } from "../../../../hooks/useForm";

const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

export const formValidationRules = (values: ValidateValues) => {
  let errors: ErrorValues = {};
  if (!values.email) {
    errors.email = "Please enter a email.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Please enter a valid email.";
  }
  return errors;
};
