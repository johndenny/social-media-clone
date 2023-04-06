import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { EditCollection } from "../../../routes/Profile/Saved/Collection/EditCollection";
import { BackDrop, Container } from "../styled";

interface Props {}

export const EditCollectionModal: React.FC<Props> = () => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <EditCollection />
      </Container>
    </BackDrop>
  );
};
