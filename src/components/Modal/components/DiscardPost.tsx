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
  isClosing?: boolean;
}

export const DiscardPost: React.FC<Props> = ({ isClosing }) => {
  const { setIsCreatePostOpen, setModalAttrs, setUrlFiles } =
    useGlobalContext() as globalContextType;

  const discardHandler = () => {
    isClosing ? setIsCreatePostOpen(false) : setUrlFiles([]);

    setModalAttrs(null);
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>Discard Post?</HeaderText>
          <Paragraph>If you leave, your edits won't be saved.</Paragraph>
        </Header>
        <ModalButton onClick={discardHandler} color="--error">
          Discard
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
