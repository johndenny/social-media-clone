import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { Button } from "../../../../styled";
import {
  Container,
  Header,
  Paragraph,
} from "../../components/PhotosPlaceholder/styled";
import { SavedIcon } from "../styled";

interface Props {}

export const Placeholder: React.FC<Props> = () => {
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

  return (
    <article>
      <Container>
        <SavedIcon></SavedIcon>
        <Header>Start Saving</Header>
        <Paragraph>Save photos to your collection</Paragraph>
        <Button onClick={addNavigateHandler}>Add to collection</Button>
      </Container>
    </article>
  );
};
