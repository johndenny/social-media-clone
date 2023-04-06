import React from "react";
import { useDirectContext } from "../../../..";
import { Button, Container, SecondaryText, TextContainer } from "./styled";
import { ReactComponent as CloseSvg } from "../../../../../../assets/svgs/close.svg";
import useGlobalContext from "../../../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../../../context/GlobalContext";

interface Props {}

export const ReplyDetails: React.FC<Props> = () => {
  const { viewer } = useGlobalContext() as globalContextType;
  const { data } = viewer;
  const {
    messageToReply,
    setMessageToReply,
    isReplyClosing,
    setIsReplyClosing,
  } = useDirectContext();

  const replyTextHandler = () => {
    switch (messageToReply.type) {
      case "post":
        return "Post";
      case "photo":
        return "Photo";
      case "sticker":
        return "Sticker";
      case "text":
        return messageToReply.text;
      case "reply":
        return messageToReply.text;

      default:
        break;
    }
  };

  const usernameTextHandler = () => {
    const { username } = messageToReply.sentBy;
    if (username === data.viewer.username) return "yourself";
    return username;
  };

  const animationEndHandler = () => {
    if (!isReplyClosing) return;
    setMessageToReply(null);
    setIsReplyClosing(false);
  };

  return (
    <Container isClosing={isReplyClosing} onAnimationEnd={animationEndHandler}>
      <TextContainer>
        <SecondaryText>{`Replying to ${usernameTextHandler()}`}</SecondaryText>
        <span>{replyTextHandler()}</span>
      </TextContainer>
      <Button onClick={() => setIsReplyClosing(true)}>
        <CloseSvg height={16} width={16} />
      </Button>
    </Container>
  );
};
