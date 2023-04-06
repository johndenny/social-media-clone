import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useRegisterContext } from "../";
import { PaddedButton } from "../../../../components/PaddedButton";
import Input from "../../../../components/Input";
import { LoginForm } from "../../styled";
import { useForm } from "../../../../hooks/useForm";
import { formValidationRules } from "./formValidationRules";
import { CreateConfirmation } from "../../../../graphQL/mutations";

export const Email: React.FC = () => {
  const { email, setEmail } = useRegisterContext();
  const [result, createConfirmation] = useMutation(CreateConfirmation);
  const navigate = useNavigate();
  const { errors, values, handleChange, handleSubmit, setValues } = useForm(
    createConfirmation,
    formValidationRules
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (result.data && values.email) {
      setEmail(values.email);
      navigate("/accounts/signup/emailConfirmation");
    }
  }, [result]);

  useEffect(() => {
    inputRef.current?.focus();
    if (email) {
      setValues({ email });
    }
  }, []);

  return (
    <LoginForm onSubmit={handleSubmit} name="email">
      <Input
        Type="email"
        name="email"
        label="Email Address"
        type="text"
        onChange={handleChange}
        value={values.email || ""}
        errorMessage={errors.email || errors.server}
        Ref={inputRef}
      />
      <PaddedButton
        fetching={result.fetching}
        margin="16px 0"
        padding="10px 18px"
        disabled={Object.keys(errors).length !== 0}
      >
        Next
      </PaddedButton>
    </LoginForm>
  );
};
