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

export const DeletePost: React.FC<Props> = ({ postId }) => {
  const { deletePostHandler, setModalAttrs } =
    useGlobalContext() as globalContextType;

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>Delete Post?</HeaderText>
          <Paragraph>Are you sure you want to delete this post?</Paragraph>
        </Header>
        <ModalButton onClick={() => deletePostHandler(postId)} color="--error">
          Delete
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
