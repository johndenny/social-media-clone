import React from "react";
import { Container, Text, Title } from "./styled";

interface Props {}

export const EmptyComments: React.FC<Props> = () => {
  return (
    <Container>
      <Title>No comments yet.</Title>
      <Text>Start the conversation.</Text>
    </Container>
  );
};
