import React from "react";
import {
  BackDrop,
  Container,
  Header,
  HeaderText,
  ModalButton,
} from "../styled";
import { LeaveChat as LeaveChatMutation } from "../../../graphQL/mutations/LeaveChat";
import { useMutation } from "urql";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { globalContextType } from "../../../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";

interface Props {}

export const LeaveChat: React.FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { setFooterMessage, setModalAttrs } =
    useGlobalContext() as globalContextType;
  const [resultLeaveChat, leaveChatMutation] = useMutation(LeaveChatMutation);

  const leaveChat = () => {
    leaveChatMutation({ chatId: params.chatId }).then((result) => {
      if (result.error) setFooterMessage("Error leaving chat.");
      if (result.data) {
        setModalAttrs(null);
        navigate("/direct/inbox/");
      }
    });
  };
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>{"Leave Chat"}</HeaderText>
          <p>
            You won't get messages from this group unless someone adds you back
            to the chat.
          </p>
        </Header>
        <ModalButton onClick={leaveChat} color="--error">
          Leave
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
