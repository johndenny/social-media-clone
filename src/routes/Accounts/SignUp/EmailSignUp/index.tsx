import { useEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import { useRegisterContext } from "..";
import Input from "../../../../components/Input";
import { PaddedButton } from "../../../../components/PaddedButton";
import { CreateConfirmation } from "../../../../graphQL/mutations";
import { useForm } from "../../../../hooks/useForm";
import { FacebookButton } from "../../components/FacebookButton";
import { Logo } from "../../components/Logo";
import { Spacer } from "../../components/Spacer";
import {
  BackLinkContainer,
  ImageContainer,
  LoginForm,
  Parargraph,
  StyledLink,
} from "../../styled";
import { ConfirmEmail } from "../ConfirmEmail";
import { formValidationRules } from "./formValidationRules";
import { EmailIcon } from "./styled/EmailIcon";

export const EmailSignUp = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmationSent, setIsConfirmationSent] = useState(false);
  const { setEmail } = useRegisterContext();
  const [result, createConfirmation] = useMutation(CreateConfirmation);
  const { handleSubmit, handleChange, errors, values, setValues } = useForm(
    createConfirmation,
    formValidationRules
  );

  useEffect(() => {
    setValues({ fullName: "" });
    firstInputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (result.data && values.email) {
      setEmail(values.email);
      setIsConfirmationSent(true);
    }
  }, [result.data]);

  return (
    <>
      {isConfirmationSent ? (
        <>
          <div style={{ margin: "36px 36px 0px 36px" }}>
            <EmailIcon
              className="glyphsSpriteEmail_confirm"
              role="img"
            ></EmailIcon>
          </div>
          <ConfirmEmail passedValues={values} />
        </>
      ) : (
        <>
          <Logo />
          <Parargraph>
            Sign up to see photos and videos from your friends.
          </Parargraph>
          <LoginForm onSubmit={handleSubmit} name="signup">
            <FacebookButton />
            <Spacer />
            <Input
              Type="email"
              name="email"
              label="Email"
              type="text"
              autoCapitalize="off"
              autoComplete="new-password"
              onChange={handleChange}
              value={values.email || ""}
              errorMessage={errors.email}
              margin="6px 0"
              Ref={firstInputRef}
            />

            <Input
              Type="fullName"
              name="fullName"
              label="Full Name"
              type="text"
              autoCapitalize="off"
              autoComplete="chrome-off"
              onChange={handleChange}
              value={values.fullName || ""}
              errorMessage={errors.fullName}
            />

            <Input
              Type="username"
              name="username"
              label="Username"
              type="text"
              autoCapitalize="off"
              autoComplete="off"
              onChange={handleChange}
              value={values.username || ""}
              errorMessage={errors.username}
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
              fetching={result.fetching}
              margin="16px 0"
              padding="10px 18px"
              disabled={Object.keys(errors).length !== 0}
            >
              Sign Up
            </PaddedButton>
          </LoginForm>
        </>
      )}

      <BackLinkContainer isMobile={false}>
        <StyledLink to="/accounts/login">Back To Login</StyledLink>
      </BackLinkContainer>
    </>
  );
};
