import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import {
  BackDrop,
  Container,
  Header,
  HeaderText,
  ModalButton,
  Paragraph,
} from "../styled";

interface Props {
  postId: string;
}

export const DeleteSavedPost: React.FC<Props> = ({ postId }) => {
  const { unsavePostHandler, setModalAttrs } =
    useGlobalContext() as globalContextType;

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>Remove From Saved and Collections?</HeaderText>
        </Header>
        <Paragraph>
          Removing this post from saved will also remove it from collections.
        </Paragraph>
        <ModalButton color="--error" onClick={() => unsavePostHandler(postId)}>
          Remove
        </ModalButton>
        <ModalButton
          onClick={() => setModalAttrs(null)}
          weight="400"
          color="--primary-text"
        >
          Cancel
        </ModalButton>
      </Container>
    </BackDrop>
  );
};
