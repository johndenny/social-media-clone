import React from "react";
import { useMutation } from "urql";
import { globalContextType } from "../../../context/GlobalContext";
import { DeleteMessage } from "../../../graphQL/mutations";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { BackDrop, Container, ModalButton } from "../styled";

interface Props {
  text: string;
  messageId: string;
}

export const Message: React.FC<Props> = ({ text, messageId }) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  const [resultDeleteMessage, deleteMessage] = useMutation(DeleteMessage);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setModalAttrs(null);
  };

  const unsendHandler = () => {
    deleteMessage({ messageId }).then((result) => setModalAttrs(null));
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalButton onClick={copyText} color="--primary-text" weight="400">
          Copy
        </ModalButton>
        <ModalButton
          onClick={unsendHandler}
          color="--primary-text"
          weight="400"
        >
          Unsend
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
