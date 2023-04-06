import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useRegisterContext } from "../";
import { PaddedButton } from "../../../../components/PaddedButton";
import Input from "../../../../components/Input";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { LoginForm, Parargraph } from "../../styled";
import { SignUpTextHeader } from "../styled";
import { Button } from "../../../../styled";
import { formValidationRules } from "./formValidationRules";
import { useForm, ValidateValues } from "../../../../hooks/useForm";
import { setAccessToken } from "../../../../utils/accessToken";
import { CreateConfirmation, SignUp } from "../../../../graphQL/mutations";
import { ConfirmEmail as ConfirmEmailMutation } from "../../../../graphQL/mutations";

interface Props {
  passedValues?: ValidateValues;
}

export const ConfirmEmail: React.FC<Props> = ({ passedValues }) => {
  const { setFooterMessage, reexecuteViewerQuery } =
    useGlobalContext() as globalContextType;
  const { email } = useRegisterContext();
  const [createResult, createConfirmation] = useMutation(CreateConfirmation);
  const [confirmResult, confirmEmail] = useMutation(ConfirmEmailMutation);
  const [signUpResult, signUpMutation] = useMutation(SignUp);
  const { errors, values, handleChange, handleSubmit, setValues } = useForm(
    confirmEmail,
    formValidationRules
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const resend = () => {
    const variable = { email };
    createConfirmation(variable).then((result) => {
      if (result.error) {
        return setFooterMessage(result.error.graphQLErrors[0].message);
      }
      setFooterMessage(`We sent the confirmation code to your email ${email}`);
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
    setValues({ email });
  }, []);

  useEffect(() => {
    if (!confirmResult.data) return;
    if (!passedValues) {
      return navigate("/accounts/signup/name");
    }
    if (passedValues) {
      signUpMutation(passedValues).then((result) => {
        if (result.error) {
          setFooterMessage(result.error.graphQLErrors[0].message);
        }
        if (result.data) {
          setAccessToken(result.data.signup.accessToken);
          reexecuteViewerQuery();
        }
      });
    }
  }, [confirmResult.data]);

  return (
    <>
      <SignUpTextHeader>Enter Confirmation Code</SignUpTextHeader>
      <Parargraph data-testid="confirm-code">
        {`Enter the confirmation code we sent to ${email} `}
        <Button onClick={resend}>Resend Code</Button>
      </Parargraph>
      <LoginForm onSubmit={handleSubmit} name="confirm-code">
        <Input
          Ref={inputRef}
          Type="passcode"
          name="passcode"
          label="Confimration Code"
          type="tel"
          onChange={handleChange}
          value={values.passcode || ""}
          errorMessage={errors.server || errors.passcode}
        />
        <PaddedButton
          fetching={confirmResult.fetching}
          padding="10px 18px"
          margin={"16px 0"}
          disabled={
            errors.passcode !== undefined || errors.server !== undefined
          }
        >
          Next
        </PaddedButton>
      </LoginForm>
    </>
  );
};
