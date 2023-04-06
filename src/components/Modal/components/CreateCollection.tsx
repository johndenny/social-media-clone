import React from "react";
import { useNavigate } from "react-router-dom";
import { NewCollection } from "../../../routes/Profile/Saved/NewCollection";
import { BackDrop, Container } from "../styled";

interface Props {}

export const CreateCollection: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <BackDrop onClick={() => navigate(-1)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <NewCollection />
      </Container>
    </BackDrop>
  );
};
