import React from "react";
import { Container, Line } from "./styled";

interface Props {}

export const Grid: React.FC<Props> = () => {
  return (
    <Container>
      <Line left="33%" top="0%" width="1px" height="100%"></Line>
      <Line right="33%" top="0%" width="1px" height="100%"></Line>
      <Line top="33%" left="0%" width="100%" height="1px"></Line>
      <Line bottom="33%" left="0%" width="100%" height="1px"></Line>
    </Container>
  );
};
