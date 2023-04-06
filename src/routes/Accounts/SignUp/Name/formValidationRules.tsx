import { ErrorValues, ValidateValues } from "../../../../hooks/useForm";

const FULLNAME_REGEX = /^.{0,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const formValidationRules = (values: ValidateValues) => {
  let errors: ErrorValues = {};

  if (values.fullName) {
    if (!FULLNAME_REGEX.test(values.fullName)) {
      errors.fullName =
        "Your full name cannot exceed 30 characters including one space.";
    }
  }

  if (!values.password) {
    errors.password =
      "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%).";
  } else if (!PWD_REGEX.test(values.password)) {
    errors.password =
      "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%).";
  }

  return errors;
};
