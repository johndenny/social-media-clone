import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useRegisterContext } from "../";
import { setAccessToken } from "../../../../utils/accessToken";
import { PaddedButton } from "../../../../components/PaddedButton";
import Input from "../../../../components/Input";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { LoginForm, Parargraph } from "../../styled";
import { SignUpTextHeader } from "../styled";
import { useForm } from "../../../../hooks/useForm";
import { formValidationRules } from "./formValidationRules";
import { SignUp } from "../../../../graphQL/mutations";

export const Name: React.FC = () => {
  const { setFooterMessage } = useGlobalContext() as globalContextType;
  const { email } = useRegisterContext();
  const [resultSignUp, signUpMutation] = useMutation(SignUp);
  const navigate = useNavigate();
  const { errors, handleChange, handleSubmit, setValues, values } = useForm(
    signUpMutation,
    formValidationRules
  );
  const fullNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fullNameRef.current?.focus();
    setValues({ email, username: "", fullName: "" });
  }, []);

  useEffect(() => {
    if (resultSignUp.data) {
      setAccessToken(resultSignUp.data.signup.accessToken);
      navigate("/accounts/signup/username");
    }
  }, [resultSignUp.data]);

  useEffect(() => {
    if (errors.server) {
      setFooterMessage(errors.server);
    }
  }, [errors.server]);

  return (
    <>
      <SignUpTextHeader>Enter name and password</SignUpTextHeader>
      <Parargraph>Add your name so friends can find you.</Parargraph>
      <LoginForm onSubmit={handleSubmit} name="name">
        <Input
          Type="fullname"
          type="text"
          name="fullName"
          label="Full Name"
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
          autoCapitalize="off"
          errorMessage={errors.fullName}
          onChange={handleChange}
          value={values.fullName || ""}
          Ref={fullNameRef}
          margin="6px 0"
        />
        <Input
          Type="password"
          name="password"
          label="Password"
          autoComplete="off"
          onChange={handleChange}
          value={values.password || ""}
          errorMessage={errors.password}
        />
        <PaddedButton
          padding="10px 18px"
          fetching={resultSignUp.fetching}
          margin="16px 0"
          disabled={Object.keys(errors).length !== 0}
        >
          Next
        </PaddedButton>
      </LoginForm>
    </>
  );
};
