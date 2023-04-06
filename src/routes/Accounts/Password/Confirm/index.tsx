import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "urql";
import Input from "../../../../components/Input";
import { PaddedButton } from "../../../../components/PaddedButton";
import { ConfirmReset, VerifyReset } from "../../../../graphQL/mutations";
import { Button } from "../../../../styled";
import { LoginForm, Parargraph, TextHeader } from "../../styled";
import { ConfirmContainer, MatchMessage } from "./styled";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface SavedValues {
  userId?: number;
  resetToken?: string;
}

export const Confirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifyResetResult, verifyResetMutation] = useMutation(VerifyReset);
  const [confirmResetResult, confirmResetMutation] = useMutation(ConfirmReset);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [savedValues, setSavedValues] = useState<SavedValues>({});
  const passwordErrorMessage =
    "Your password must be at least 8 characters and include a number, letter, capital letter and special character (!$@%).";

  useEffect(() => {
    try {
      const userIdString = searchParams.get("uid");
      if (!userIdString) {
        throw new Error("No User Identified.");
      }
      const userId = parseInt(userIdString);
      const resetToken = searchParams.get("token");
      if (!resetToken) {
        throw new Error("No Token.");
      }
      const variables = { userId, resetToken };
      setSavedValues(variables);
      verifyResetMutation(variables).then((result) => {
        if (result.error) {
          navigate("/");
        }
      });
    } catch (error) {
      navigate("/");
    }
  }, []);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const valid = PWD_REGEX.test(password);
    if (!valid && password !== "") {
      return setInputErrorMessage(passwordErrorMessage);
    }
    try {
      const variables = { ...savedValues, password };
      confirmResetMutation(variables).then((result) => {
        if (result.error) {
          setInputErrorMessage(result.error.graphQLErrors[0].message);
        }
        if (result.data) {
          setIsReset(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const valid = PWD_REGEX.test(password);
    if (!valid && password !== "") {
      return setInputErrorMessage(passwordErrorMessage);
    }
    setInputErrorMessage("");
    if (password !== "" && password === confirmPassword && valid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [confirmPassword, password]);

  if (isReset)
    return (
      <>
        <TextHeader>Your Password has been reset</TextHeader>
        <Button margin="16px" onClick={() => navigate("/accounts/login")}>
          Log in
        </Button>
      </>
    );

  return (
    <>
      <TextHeader>Create a Strong Password</TextHeader>
      <Parargraph>
        Your password must be at least 6 characters and include a number, letter
        and special character (!$@%).
      </Parargraph>
      <LoginForm onSubmit={submit} name="confirm">
        <Input
          Type="password"
          name={"newPassword"}
          label={"New password"}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          errorMessage={inputErrorMessage}
        />

        <ConfirmContainer>
          {confirmPassword !== "" && password !== confirmPassword && (
            <MatchMessage role="alert">Passwords don't match.</MatchMessage>
          )}

          <Input
            Type="password"
            name={"confirmPassword"}
            label={"Confirm new password"}
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </ConfirmContainer>
        <PaddedButton
          fetching={confirmResetResult.fetching}
          margin="8px 40px"
          padding="10px 18px"
          disabled={!isValid}
        >
          Reset Password
        </PaddedButton>
      </LoginForm>
    </>
  );
};
