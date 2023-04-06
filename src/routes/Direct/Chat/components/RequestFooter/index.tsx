import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useDirectContext } from "../../..";
import { globalContextType } from "../../../../../context/GlobalContext";
import {
  AcceptChat,
  RemoveChatRequest,
} from "../../../../../graphQL/mutations";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { UserNamesI } from "../../../../../types";
import {
  Button,
  ButtonContainer,
  Container,
  Paragraph,
  SecondaryParagraph,
  TextContainer,
  VerticalLine,
} from "./styled";

interface Props {
  createdBy: UserNamesI;
  id: string;
}

export const RequestFooter: React.FC<Props> = ({ createdBy, id }) => {
  const navigate = useNavigate();
  const { setIsRequests } = useDirectContext();
  const { setFooterMessage, messagesDate, queryVarsDispatch } =
    useGlobalContext() as globalContextType;
  const [acceptChatResult, acceptChatMutation] = useMutation(AcceptChat);
  const [removeRequestResult, removeRequestMutation] =
    useMutation(RemoveChatRequest);

  const acceptChatHandler = () =>
    acceptChatMutation({ chatId: id, date: messagesDate }).then((result) => {
      if (result.error) setFooterMessage("Server error");
      if (result.data) {
        setIsRequests(false);
        navigate(`/direct/t/${id}/`);
      }
    });

  const removeRequestHandler = () =>
    removeRequestMutation({ chatId: id, date: messagesDate }).then((result) => {
      if (result.error) setFooterMessage("Server error");
      if (result.data) {
        queryVarsDispatch({ type: "reset" });
        navigate("/direct/requests/");
      }
    });

  return (
    <Container>
      <TextContainer>
        <Paragraph>{`Accept message request from ${createdBy.fullName} (${createdBy.username})`}</Paragraph>
        <SecondaryParagraph>
          {`if you accept, this chat will be included in your inbox and you will recieve notifications`}
        </SecondaryParagraph>
      </TextContainer>

      <ButtonContainer>
        <Button
          onClick={removeRequestHandler}
          style={{ color: "rgb(var(--error))" }}
        >
          Delete
        </Button>
        <VerticalLine></VerticalLine>
        <Button onClick={acceptChatHandler}>Accept</Button>
      </ButtonContainer>
    </Container>
  );
};
