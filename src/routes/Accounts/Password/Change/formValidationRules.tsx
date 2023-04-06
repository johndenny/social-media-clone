import { ErrorValues, ValidateValues } from "../../../../hooks/useForm";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const formValidationRules = (values: ValidateValues) => {
  let errors: ErrorValues = {};

  if (values.oldPassword === "")
    errors.oldPassword = "Please enter old password.";

  if (!values.newPassword || !PWD_REGEX.test(values.newPassword))
    errors.newPassword =
      "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%).";

  if (values.newPassword && values.oldPassword === values.newPassword)
    errors.newPassword = "Please use a new password.";

  if (values.confirmPassword !== values.newPassword)
    errors.confirmPassword = "New password does not match.";

  return errors;
};
