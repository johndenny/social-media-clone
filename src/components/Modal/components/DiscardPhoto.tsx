import React, { useContext } from "react";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../context/CreatePostContext";
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

interface Props {}

export const DiscardPhoto: React.FC<Props> = () => {
  const { urlFiles, setUrlFiles, setModalAttrs } =
    useGlobalContext() as globalContextType;
  const { selectedIndex, setSelectedIndex } = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const discardHandler = () => {
    const newUrlFiles = [...urlFiles];

    newUrlFiles.splice(selectedIndex, 1);

    const newIndex =
      selectedIndex >= newUrlFiles.length - 1
        ? newUrlFiles.length - 1
        : selectedIndex;

    setSelectedIndex(newIndex);
    setUrlFiles(newUrlFiles);
    setModalAttrs(null);
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>Discard Photo?</HeaderText>
          <Paragraph>This will remove the photo from your post.</Paragraph>
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
