import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { UserNamesI } from "../../../types";
import { NewMessageForm } from "../../NewMessageForm";
import {
  BackDrop,
  Container,
  FullScreen,
  NewMessageContainer,
} from "../styled";

interface Props {
  members: UserNamesI[];
}

export const Add: React.FC<Props> = ({ members }) => {
  const { isMobile, setModalAttrs } = useGlobalContext() as globalContextType;
  return isMobile ? (
    <FullScreen>
      <NewMessageForm members={members} />
    </FullScreen>
  ) : (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <NewMessageContainer>
          <NewMessageForm members={members} />
        </NewMessageContainer>
      </Container>
    </BackDrop>
  );
};
