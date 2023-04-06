import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { BackDrop, Container, ModalButton } from "../styled";

interface Props {
  id: string;
  removeCommentHandler: (commentId: string) => void;
}

export const Comment: React.FC<Props> = ({ removeCommentHandler, id }) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalButton onClick={() => removeCommentHandler(id)} color="--error">
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
