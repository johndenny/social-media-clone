import React from "react";
import { useMutation } from "urql";
import { globalContextType } from "../../../context/GlobalContext";
import { DeleteCollection } from "../../../graphQL/mutations";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { Spinner } from "../../Spinner";
import {
  BackDrop,
  Container,
  Header,
  HeaderText,
  ModalButton,
  Paragraph,
} from "../styled";

interface Props {
  id: string;
}

export const DeleteCollectionModal: React.FC<Props> = ({ id }) => {
  const { setFooterMessage, setModalAttrs } =
    useGlobalContext() as globalContextType;
  const [deleteCollectionResult, deleteCollectionMutation] =
    useMutation(DeleteCollection);

  const deleteHandler = () => {
    deleteCollectionMutation({ collectionId: id }).then((result) => {
      setModalAttrs(null);
      if (result.data) setFooterMessage("Collection removed.");
      if (result.error) setFooterMessage("Error removing collection.");
    });
  };
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>Delete Collection?</HeaderText>
          <Paragraph>
            When you delete this collection the photos and videos will still be
            saved.
          </Paragraph>
        </Header>
        <ModalButton color="--error" onClick={deleteHandler}>
          {deleteCollectionResult.fetching ? (
            <Spinner size="small" />
          ) : (
            <span>Delete</span>
          )}
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
