import React from "react";
import { TextPlaceholder } from "../../styled";
import { Container, Thumbnail } from "./CollectionItem/styled";

interface Props {}

export const Placeholder: React.FC<Props> = () => {
  return (
    <Container>
      <Thumbnail></Thumbnail>
      <TextPlaceholder width={72}></TextPlaceholder>
    </Container>
  );
};
