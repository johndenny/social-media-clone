import { ValidateValues, ErrorValues } from "../../../hooks/useForm";

const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;
const FULLNAME_REGEX = /^(?!.{31,})(\w+\s+\w+)$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._]{3,30}$/;

export const formValidationRules = (values: ValidateValues) => {
  let errors: ErrorValues = {};
  if (values.email) {
    if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Please enter a valid email.";
    }
  } else if (values.email === "") {
    errors.email = "Please enter a email";
  }

  if (values.bio) {
    if (values.bio.length > 150) {
      errors.bio = "Bio cannot exceed 150 characters.";
    }
  }

  if (values.fullName) {
    if (!FULLNAME_REGEX.test(values.fullName)) {
      errors.fullName =
        "Your full name cannot exceed 30 characters including one space.";
    }
  }

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
