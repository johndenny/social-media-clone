import React from "react";
import { Input, Label, Toggle } from "./styled";

interface Props {
  id: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleInput: React.FC<Props> = ({ id, checked, setChecked }) => {
  return (
    <Label htmlFor={id}>
      <Input
        type="checkbox"
        id={id}
        onChange={(e) => setChecked(e.currentTarget.checked)}
        checked={checked}
      />
      <Toggle />
    </Label>
  );
};
