import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, SubMenuButton, SubMenuContainer } from "./styled";
import { ReactComponent as OptionsDotsSvg } from "../../../../../../assets/svgs/optionsDots.svg";
import { ReactComponent as MessageReplySvg } from "../../../../../../assets/svgs/messageReply.svg";
import { EmojiModal } from "../../../../../../components/EmojiModal";
import { useDirectContext } from "../../../..";
import { MessageProps } from "../../..";
import { useMutation } from "urql";
import { DeleteMessage } from "../../../../../../graphQL/mutations";
import useGlobalContext from "../../../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../../../context/GlobalContext";

interface Props {
  isFlipped?: boolean;
  message: MessageProps;
  isMenuHidden: boolean;
  setIsMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
  subMenuButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
  likeToggle: () => void;
}

export const Options: React.FC<Props> = ({
  isFlipped,
  message,
  isMenuHidden,
  setIsMenuHidden,
  subMenuButtonRef,
  likeToggle,
}) => {
  const {
    setMessageToReply,
    messageToReply,
    setIsReplyClosing,
    openSubMenuId,
    setOpenSubMenuId,
  } = useDirectContext();

  const [resultDelete, deleteMessage] = useMutation(DeleteMessage);
  const {
    setFooterMessage,
    setModalAttrs,
    openMessageMenuId,
    setOpenMessageMenuId,
  } = useGlobalContext() as globalContextType;

  const isMenuOpen = openSubMenuId === message.id;

  const [isClosing, setIsClosing] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [wasMenuOpen, setWasMenuOpen] = useState(false);

  const deleteMessageHandler = () => {
    deleteMessage({ messageId: message.id }).then((result) => {
      if (result.error) {
        setFooterMessage("Error unsending message");
        console.error(new Error("Error Deleting message"));
      }
    });
  };

  const subMenuClickHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (isMenuOpen) return setIsClosing(true);
    setOpenSubMenuId(message.id);
  };

  useEffect(() => {
    window.addEventListener("click", () => setOpenSubMenuId(""));
    return () => {
      window.removeEventListener("click", () => setOpenSubMenuId(""));
    };
  }, []);

  const animationEndHandler = () => {
    if (isClosing) setOpenSubMenuId("");
    setIsClosing(false);
  };

  const replyHandler = () => {
    if (!messageToReply || messageToReply.id !== message.id)
      return setMessageToReply(message);
    setIsReplyClosing(true);
  };

  const forwardHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenSubMenuId("");
    setModalAttrs({ type: "share", variables: { id: "", message } });
  };

  if (isFlipped)
    return (
      <Container isFlipped={isFlipped}>
        <EmojiModal messageId={message.id} />
        <Button>
          <MessageReplySvg onClick={replyHandler} />
        </Button>
        {isMenuOpen && (
          <SubMenuContainer
            isClosing={isClosing}
            onAnimationEnd={animationEndHandler}
          >
            <SubMenuButton
              onClick={() =>
                setModalAttrs({
                  type: "share",
                  variables: { id: openMessageMenuId, message },
                })
              }
            >
              Forward
            </SubMenuButton>
            <SubMenuButton onClick={likeToggle}>
              {message.isLiked ? "Unlike" : "Like"}
            </SubMenuButton>
          </SubMenuContainer>
        )}

        <Button onClick={subMenuClickHandler} ref={subMenuButtonRef}>
          <OptionsDotsSvg width={24} height={24} />
        </Button>
      </Container>
    );

  return (
    <Container isFlipped={isFlipped}>
      <Button onClick={subMenuClickHandler} ref={subMenuButtonRef}>
        <OptionsDotsSvg width={24} height={24} />
      </Button>
      {isMenuOpen && (
        <SubMenuContainer
          isClosing={isClosing}
          onAnimationEnd={animationEndHandler}
        >
          <SubMenuButton onClick={deleteMessageHandler}>Unsend</SubMenuButton>
          <SubMenuButton onClick={forwardHandler}>Forward</SubMenuButton>
          <SubMenuButton onClick={likeToggle}>
            {message.isLiked ? "Unlike" : "Like"}
          </SubMenuButton>
        </SubMenuContainer>
      )}
      <Button onClick={replyHandler}>
        <MessageReplySvg />
      </Button>
      <EmojiModal messageId={message.id} />
    </Container>
  );
};
