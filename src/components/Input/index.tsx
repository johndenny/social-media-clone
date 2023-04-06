import React, {
  InputHTMLAttributes,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Container,
  ErrorParagraph,
  IconContainer,
  InputStyled,
  Label,
  PasswordButton,
  Placeholder,
} from "./styled";
import { Margin } from "./styled/Margin";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  Type: string;
  name: string;
  label: string;
  margin?: string;
  Ref?: Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  errorMessage,
  label,
  Type,
  Ref,
  margin,
  ...attr
}) => {
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  useEffect(() => {
    if (errorMessage && !isFocused && errorRef.current) {
      errorRef.current.focus();
    }
  }, [errorMessage, isFocused]);

  useEffect(() => {}, [attr.value]);

  return (
    <>
      <Margin margin={margin}>
        <Container
          Type={Type}
          isFocused={isFocused}
          errorMessage={errorMessage}
        >
          <Label htmlFor={attr.name}>
            <Placeholder value={attr?.value ? true : false}>
              {label}
            </Placeholder>
            <InputStyled
              ref={Ref}
              id={attr.name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={(e) => {
                if (e.key === "Enter") setIsFocused(false);
              }}
              type={
                isPasswordHidden && Type === "password" ? "password" : "text"
              }
              {...attr}
            />
          </Label>
          <IconContainer>
            {Type === "password" && attr.value !== "" && (
              <PasswordButton
                type="button"
                onClick={() =>
                  setIsPasswordHidden((prevState) => (prevState ? false : true))
                }
              >
                {isPasswordHidden ? "Show" : "Hide"}
              </PasswordButton>
            )}
          </IconContainer>
        </Container>
        {errorMessage && (Type === "password" ? true : !isFocused) && (
          <ErrorParagraph role="alert" ref={errorRef}>
            {errorMessage}
          </ErrorParagraph>
        )}
      </Margin>
    </>
  );
};

export default Input;
