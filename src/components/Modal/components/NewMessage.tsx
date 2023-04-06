import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../../../App";
import { NewMessageForm } from "../../NewMessageForm";
import { BackDrop, Container, NewMessageContainer } from "../styled";

interface Props {}

export const NewMessage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <BackDrop
      onClick={() =>
        navigate(`${(location.state as LocationState).background}`)
      }
    >
      <Container onClick={(e) => e.stopPropagation()}>
        <NewMessageContainer>
          <NewMessageForm />
        </NewMessageContainer>
      </Container>
    </BackDrop>
  );
};
