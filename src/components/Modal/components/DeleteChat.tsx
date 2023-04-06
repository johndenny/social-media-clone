import React from "react";
import {
  BackDrop,
  Container,
  Header,
  HeaderText,
  ModalButton,
} from "../styled";
import { DeleteChat as DeleteChatMutation } from "../../../graphQL/mutations/DeleteChat";
import { useMutation } from "urql";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { globalContextType } from "../../../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteChat: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { setFooterMessage, setModalAttrs } =
    useGlobalContext() as globalContextType;
  const [resultDeleteChat, deleteChatMutation] =
    useMutation(DeleteChatMutation);

  const deleteChat = () => {
    deleteChatMutation({ chatId: params.chatId }).then((result) => {
      if (result.error) setFooterMessage("Error deleteing chat.");
      if (result.data) {
        setModalAttrs(null);
        navigate("/direct/inbox/", { replace: true });
      }
    });
  };

  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderText>{"Delete Chat"}</HeaderText>
        </Header>
        <ModalButton onClick={deleteChat} color="--error">
          Delete
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
