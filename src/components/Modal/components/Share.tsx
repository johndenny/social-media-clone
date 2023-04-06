import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { MessageProps } from "../../../routes/Direct/Chat";
import { NewMessageForm } from "../../NewMessageForm";
import {
  BackDrop,
  Container,
  FullScreen,
  NewMessageContainer,
} from "../styled";

interface Props {
  id: string;
  message?: MessageProps;
}

export const Share: React.FC<Props> = ({ id, message }) => {
  const { isMobile, setModalAttrs } = useGlobalContext() as globalContextType;
  return isMobile ? (
    <FullScreen>
      <NewMessageForm postId={id} />
    </FullScreen>
  ) : (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <NewMessageContainer>
          <NewMessageForm postId={id} message={message} />
        </NewMessageContainer>
      </Container>
    </BackDrop>
  );
};
