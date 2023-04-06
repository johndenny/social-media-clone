import React, { SyntheticEvent, useState } from "react";
import { Button, ButtonContainer } from "./styled";
import { ReactComponent as EmojiSvg } from "../../assets/svgs/emoji.svg";
import { Emojis } from "./Emoji";
import { ClickCatch } from "../Navigation/styled";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType } from "../../context/GlobalContext";

interface Props {
  setText?: React.Dispatch<React.SetStateAction<string>>;
  messageId?: string;
  isCreatePost?: boolean;
}

export const EmojiModal: React.FC<Props> = ({
  setText,
  messageId,
  isCreatePost,
}) => {
  const { chatContainerRef, setOpenMessageMenuId } =
    useGlobalContext() as globalContextType;
  const [isEmojiHidden, setIsEmojiHidden] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const [orientation, setOrientation] = useState<"top" | "bottom">("top");

  const textClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    setTranslateX(138);
    isCreatePost
      ? setOrientation("bottom")
      : setOrientation(
          e.currentTarget.getBoundingClientRect().top < 333 ? "bottom" : "top"
        );
    setIsEmojiHidden(false);
  };

  const chatClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    let chatContainerBounding;
    if (chatContainerRef.current)
      chatContainerBounding = chatContainerRef.current.getBoundingClientRect();

    const buttonBounding = e.currentTarget.getBoundingClientRect();
    const buttonLeft = buttonBounding.left;
    const buttonTop = buttonBounding.top;

    if (!chatContainerBounding) return;

    const chatLeft = chatContainerBounding.left;
    const chatTop = chatContainerBounding.top;
    const chatWidth = chatContainerBounding.width;
    const topDiff = buttonTop - chatTop;
    const leftDiff = buttonLeft - chatLeft;
    const rightDiff = chatWidth - leftDiff;

    if (rightDiff <= 232) setTranslateX((232 - rightDiff) * -1);
    if (leftDiff <= 178) setTranslateX(178 - leftDiff);
    if (topDiff < 333) setOrientation("bottom");

    setIsEmojiHidden(false);
  };

  const clickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (setText) return textClickHandler(e);
    chatClickHandler(e);
  };

  const clickCatchHandler = () => {
    if (!setText) setOpenMessageMenuId("");
    setIsEmojiHidden(true);
  };

  return (
    <ButtonContainer isChat={setText && !isCreatePost ? false : true}>
      <Button
        onClick={clickHandler}
        isChat={setText && !isCreatePost ? false : true}
      >
        <EmojiSvg
          height={setText && !isCreatePost ? 24 : 18}
          width={setText && !isCreatePost ? 24 : 18}
        />
      </Button>
      <div
        style={
          orientation === "bottom" ? { bottom: "-18px" } : { top: "-42px" }
        }
      >
        {!isEmojiHidden && (
          <>
            <Emojis
              setComment={setText}
              translateX={translateX}
              orientation={orientation}
              messageId={messageId}
              setIsEmojiHidden={setIsEmojiHidden}
            />
            <ClickCatch onClick={clickCatchHandler}></ClickCatch>
          </>
        )}
      </div>
    </ButtonContainer>
  );
};
