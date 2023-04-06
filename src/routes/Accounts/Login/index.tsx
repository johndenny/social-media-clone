import React, {
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation } from "urql";
import { setAccessToken } from "../../../utils/accessToken";
import GlobalContext, {
  globalContextType,
} from "../../../context/GlobalContext";
import Input from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../styled";
import {
  ResetContainer,
  SignUpContainer,
  ErrorMessage,
  StyledLink,
} from "./styled";
import { PaddedButton } from "../../../components/PaddedButton";
import { Logo } from "../components/Logo";
import { FacebookButton } from "../components/FacebookButton";
import { Spacer } from "../components/Spacer";
import { SignIn } from "../../../graphQL/mutations";
import { useModalContext } from "../../../context/ModalContext";
import { ClientStateI, useClient } from "../../../context/ClientContext";

interface Props {
  isSwitch?: boolean;
}

export const Login: React.FC<Props> = ({ isSwitch }) => {
  const {
    isMobile,
    setModalAttrs,
    reexecuteViewerQuery,
    setHeaderAttrs,
    followingPostsInfinitePagination,
  } = useContext(GlobalContext) as globalContextType;
  const { resetClient } = useClient() as ClientStateI;
  const modalContext = useModalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInResult, signInMutation] = useMutation(SignIn);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (modalContext?.isModal) return;

    document.title = "Login • Instagram";
    setHeaderAttrs({});
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const variables = { email, password };
    signInMutation(variables).then((result) => {
      if (result.error) {
        setErrorMessage(result.error.graphQLErrors[0].message);
        errorRef?.current?.focus();
      }
      if (result.data) {
        if (isSwitch) {
          followingPostsInfinitePagination.scrollDispatch({ type: "reset" });
        }
        resetClient();
        const { accessToken } = result.data.login;
        setAccessToken(accessToken);
        reexecuteViewerQuery();
        modalContext?.isModal ? setModalAttrs(null) : navigate("/");
      }
    });
  };

  return (
    <>
      <Logo />
      <LoginForm onSubmit={submit} name="login">
        {!isSwitch && (
          <>
            <FacebookButton />
            <Spacer />
          </>
        )}

        <Input
          Type="text"
          name="username"
          label="Username or email"
          type="text"
          autoCapitalize="off"
          autoComplete="off"
          maxLength={75}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          margin="6px 0"
        />
        <Input
          Type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <ResetContainer>
          <StyledLink to="/accounts/password/reset">
            Forgot password?
          </StyledLink>
        </ResetContainer>
        <PaddedButton
          fetching={signInResult.fetching}
          padding="10px 18px"
          disabled={email === "" || password === ""}
        >
          Log In
        </PaddedButton>
        {errorMessage && (
          <SignUpContainer role="alert">
            <ErrorMessage ref={errorRef}>{errorMessage}</ErrorMessage>
          </SignUpContainer>
        )}
      </LoginForm>
      {!isSwitch && (
        <SignUpContainer>
          <p>
            Don't have an account?{" "}
            <StyledLink
              to={
                isMobile
                  ? "/accounts/signup/email"
                  : "/accounts/signup/emailsignup"
              }
            >
              Sign up
            </StyledLink>
          </p>
        </SignUpContainer>
      )}
    </>
  );
};
