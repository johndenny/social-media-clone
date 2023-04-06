import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { BackDrop, Container, ModalButton } from "../styled";

interface Props {
  id: string;
}

export const CollectionOptions: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { isMobile, setModalAttrs } = useGlobalContext() as globalContextType;

  const addNavigateHandler = () => {
    if (isMobile) {
      setModalAttrs(null);
      navigate(
        `/${params.username}/saved/${params.collectionName}/${params.collectionId}/add`
      );
    } else {
      setModalAttrs({ type: "add-from-saved" });
    }
  };

  const deleteNavigateHandler = () => {
    if (isMobile) {
      setModalAttrs(null);
      navigate(
        `/${params.username}/saved/${params.collectionName}/${params.collectionId}/delete`
      );
    } else {
      setModalAttrs({ type: "remove-from-saved" });
    }
  };

  const editNavigateHandler = () => {
    if (isMobile) {
      setModalAttrs(null);
      navigate(
        `/${params.username}/saved/${params.collectionName}/${params.collectionId}/edit`
      );
    } else {
      setModalAttrs({ type: "edit-collection" });
    }
  };
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ModalButton
          color="--error"
          onClick={() =>
            setModalAttrs({ type: "delete-collection", variables: { id } })
          }
        >
          Delete collection
        </ModalButton>
        <ModalButton
          onClick={addNavigateHandler}
          weight="400"
          color="--primary-text"
        >
          Add from saved
        </ModalButton>
        <ModalButton
          onClick={deleteNavigateHandler}
          weight="400"
          color="--primary-text"
        >
          Delete from collection
        </ModalButton>
        <ModalButton
          onClick={editNavigateHandler}
          weight="400"
          color="--primary-text"
        >
          Edit collection name
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
