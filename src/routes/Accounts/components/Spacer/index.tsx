import React from "react";
import { SpacerContainer, Line, Text } from "./styled";

interface Props {}

export const Spacer: React.FC<Props> = () => {
  return (
    <SpacerContainer>
      <Line></Line>
      <Text>OR</Text>
      <Line></Line>
    </SpacerContainer>
  );
};
