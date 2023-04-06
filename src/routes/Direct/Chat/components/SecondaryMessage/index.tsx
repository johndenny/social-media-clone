import React from "react";
import { Container } from "./styled";

interface Props {
  text: string;
}

export const SecondaryMessage: React.FC<Props> = ({ text }) => {
  return <Container>{text}</Container>;
};
