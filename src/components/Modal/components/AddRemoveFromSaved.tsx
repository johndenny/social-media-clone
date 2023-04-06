import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { PostSelection } from "../../../routes/Profile/Saved/Collection/PostSelection";
import { BackDrop, Container } from "../styled";

interface Props {
  type: string;
}

export const AddRemoveFromSaved: React.FC<Props> = ({ type }) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <PostSelection type={type === "add-from-saved" ? "add" : "delete"} />
      </Container>
    </BackDrop>
  );
};
