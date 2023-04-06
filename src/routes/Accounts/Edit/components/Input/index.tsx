import React, { InputHTMLAttributes, ReactNode } from "react";
import { Aside, AsideContainer, Padding } from "../../styled";
import { InputContainer, InputStyled, TextArea } from "./styled";

interface Props
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  placeholder: string;
  isTextArea?: boolean;
  label?: string;
  children?: ReactNode;
}

export const Input: React.FC<Props> = ({
  children,
  label,
  isTextArea,
  ...attr
}) => {
  return (
    <AsideContainer>
      <Aside>
        <label htmlFor={attr.id}>{attr.placeholder || label}</label>
      </Aside>

      <Padding>
        <InputContainer>
          {isTextArea ? (
            <TextArea name={attr.id} {...attr}></TextArea>
          ) : (
            <InputStyled name={attr.id} type="text" {...attr} />
          )}
        </InputContainer>
        {children}
      </Padding>
    </AsideContainer>
  );
};
