import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import { PaddedButton } from "../../../../components/PaddedButton";
import Input from "../../../../components/Input";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import {
  LoginForm,
  Parargraph,
  TextHeader,
  ImageContainer,
  BackLinkContainer,
  StyledLink,
} from "../../styled";
import { CensoredEmail, LockIcon } from "./styled";
import { Button } from "../../../../styled";
import { Spacer } from "../../components/Spacer";
import { SendReset } from "../../../../graphQL/mutations";

interface Props {}

export const Reset: React.FC<Props> = () => {
  const { isMobile } = useGlobalContext() as globalContextType;
  const [sendResetResult, sendResultMutation] = useMutation(SendReset);

  const [email, setEmail] = useState("");
  const [censoredEmail, setCensoredEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Reset Password • Instagram";
  }, []);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const variables = { email };
    sendResultMutation(variables).then((result) => {
      if (result.error) {
        setErrorMessage(result.error.graphQLErrors[0].message);
      }
      if (result.data) {
        setCensoredEmail(result.data.sendReset.censoredEmail);
      }
    });
  };

  const reset = () => {
    setCensoredEmail("");
    setEmail("");
  };

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  if (censoredEmail) {
    return (
      <>
        <TextHeader>Email Sent</TextHeader>
        <Parargraph data-testid="censored-email">
          We sent an email to <CensoredEmail>{censoredEmail}</CensoredEmail>{" "}
          with a link to reset your password.
        </Parargraph>
        <Button margin="16px" onClick={reset}>
          OK
        </Button>
        <BackLinkContainer isMobile={isMobile} data-testid="back-footer">
          <StyledLink to="/accounts/login">Back To Login</StyledLink>
        </BackLinkContainer>
      </>
    );
  } else {
    return (
      <>
        <ImageContainer>
          <LockIcon role="img" className="coreSpriteLockSmall"></LockIcon>
        </ImageContainer>
        <TextHeader>Trouble Logging In?</TextHeader>
        <Parargraph>
          Enter your email, or username and we'll send you a link to reset your
          password.
        </Parargraph>

        <LoginForm onSubmit={submit} name="reset">
          <Input
            Type="text"
            name="username"
            label="Username or email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            errorMessage={errorMessage}
            Ref={inputRef}
          />
          <PaddedButton
            margin="16px 0"
            padding="10px 18px"
            fetching={sendResetResult.fetching}
            disabled={email === ""}
          >
            Send Reset Link
          </PaddedButton>
          <Spacer />
          <StyledLink
            to={
              isMobile
                ? "/accounts/signup/email"
                : "/accounts/signup/emailsignup"
            }
          >
            Create New Account
          </StyledLink>
          <BackLinkContainer isMobile={isMobile} data-testid="back-footer">
            <StyledLink to="/accounts/login">Back To Login</StyledLink>
          </BackLinkContainer>
        </LoginForm>
      </>
    );
  }
};
