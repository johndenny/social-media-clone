import React, { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import {
  EmojiContainer,
  InputContainer,
  MessageButton,
  OuterContainer,
} from "./styled";
import { ReactComponent as PhotoSvg } from "../../../../../assets/svgs/photo.svg";
import { ReactComponent as HeartSvg } from "../../../../../assets/svgs/activity.svg";
import { TextArea } from "../../../../Post/Comments/components/CommentInput/styled";
import { useMutation } from "urql";
import { Message } from "../../../../../graphQL/mutations";
import { useParams } from "react-router-dom";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../../context/GlobalContext";
import { Hidden } from "../../../../../components/HiddenFileInput/styled/Hidden";
import { ReplyDetails } from "./ReplyDetails";
import { useDirectContext } from "../../..";
import { EmojiModal } from "../../../../../components/EmojiModal";
import { ScrollActionType } from "../../../../../hooks/useInfinitePagination";

interface Props {
  fileChangeHandler: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  scrollRef: React.RefObject<HTMLDivElement>;
  scrollDispatch: React.Dispatch<ScrollActionType>;
}

export const MessageInput: React.FC<Props> = ({
  fileChangeHandler,
  scrollRef,
  scrollDispatch,
}) => {
  const params = useParams();
  const { isMobile, queryVarsDispatch, setFooterMessage } =
    useGlobalContext() as globalContextType;
  const { messageToReply, setIsReplyClosing } = useDirectContext();
  const [resultMessage, messageMutation] = useMutation(Message);
  const [message, setMessage] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState(18);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setTextAreaHeight(1);
  };

  useLayoutEffect(() => {
    if (textAreaRef.current) textAreaRef.current.focus();
  }, [params]);

  useLayoutEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.focus();
    const scrollHeight = textAreaRef.current.scrollHeight;
    if (scrollHeight !== textAreaHeight && scrollHeight)
      setTextAreaHeight(scrollHeight);
  }, [message]);

  const messageHandler = () => {
    messageMutation({
      chatId: params.chatId,
      text: message,
      messageId: messageToReply?.id,
    }).then((result) => {
      if (result.error) {
        setFooterMessage("Error sending message.");
        queryVarsDispatch({
          type: "add",
          payload: {
            query: PreloadQuery.uniqueChat,
            variables: { chatId: params.chatId },
          },
        });
      }
      if (result.data) {
        setMessage("");
        setIsReplyClosing(true);
        scrollDispatch({ type: "scroll", payload: { scrollY: 0 } });
      }
    });
  };

  const stickerHandler = (sticker: string) => {
    messageMutation({ chatId: params.chatId, sticker }).then((result) => {
      if (result.error) {
        setFooterMessage("Error sending message.");
        queryVarsDispatch({
          type: "add",
          payload: {
            query: PreloadQuery.uniqueChat,
            variables: { chatId: params.chatId },
          },
        });
      }
      if (result.data && scrollRef.current) scrollRef.current.scrollTo(0, 0);
    });
  };

  return (
    <>
      {messageToReply && <ReplyDetails />}

      <OuterContainer>
        <InputContainer>
          {!isMobile && (
            <EmojiContainer>
              <EmojiModal setText={setMessage} />
            </EmojiContainer>
          )}

          <TextArea
            onChange={changeHandler}
            value={message}
            ref={textAreaRef}
            height={textAreaHeight}
            placeholder="Message..."
          ></TextArea>
          {message === "" ? (
            <>
              <MessageButton onClick={() => fileInputRef?.current?.click()}>
                <PhotoSvg stroke={"#262626"} />
              </MessageButton>
              <Hidden>
                <form>
                  <input
                    onClick={(e) => e.stopPropagation()}
                    onChange={fileChangeHandler}
                    ref={fileInputRef}
                    accept="image/jpeg,image/png"
                    type="file"
                  />
                </form>
              </Hidden>
              <MessageButton onClick={() => stickerHandler("heart")}>
                <HeartSvg />
              </MessageButton>
            </>
          ) : (
            <MessageButton onClick={messageHandler}>Next</MessageButton>
          )}
        </InputContainer>
      </OuterContainer>
    </>
  );
};
