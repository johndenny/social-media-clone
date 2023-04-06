import React from "react";
import {
  Container,
  Header,
  Paragraph,
} from "../components/PhotosPlaceholder/styled";
import { SavedIcon } from "./styled";

interface Props {}

export const Placeholder: React.FC<Props> = () => {
  return (
    <article>
      <Container>
        <SavedIcon></SavedIcon>
        <Header>Save</Header>
        <Paragraph>
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you've saved.
        </Paragraph>
      </Container>
    </article>
  );
};
