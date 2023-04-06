import React, { InputHTMLAttributes } from "react";
import { Checkbox, Input, Label } from "./styled";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

export const CheckboxInput: React.FC<Props> = ({ labelText, ...attr }) => {
  return (
    <Label htmlFor={attr.id}>
      <Input type="checkbox" id={attr.id} {...attr} />
      <Checkbox></Checkbox>
      {labelText}
    </Label>
  );
};
