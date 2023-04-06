import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { BackDrop, Container, ModalButton } from "../styled";

interface Props {
  removeReplyHandler: (replyId: string) => void;
  id: string;
}

export const Reply: React.FC<Props> = ({ removeReplyHandler, id }) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalButton onClick={() => removeReplyHandler(id)} color="--error">
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
