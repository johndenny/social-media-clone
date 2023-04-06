import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery, useSubscription } from "urql";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../components/HeaderMobile";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import { NewMessage } from "../../../graphQL/subsriptions/NewMessage";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { ChatInfo } from "./components/ChatInfo";
import { MessageInput } from "./components/MessageInput";
import { MessagesContainer } from "./styled/MessagesContainer";
import { PhotoContainer, ScrollContainer } from "./styled";
import { hoursElapsed } from "../../../utils/DateFormat";
import { PostValues } from "../../../components/PostItem";
import { getAspectRatio } from "../../../hooks/useImageUpload";
import { Image } from "./components/PostMessage/styled";
import { Container } from "./components/Message/styled";
import { SpinnerContainer } from "../../../components/ProfilePhotoButton/styled";
import { UploadMessagePhoto } from "../../../graphQL/mutations";
import { toBase64 } from "../../../utils/toBase64";
import { AllMessageDates, UniqueChatMessages } from "../../../graphQL/queries";
import { MessagesPage } from "./components/MessagesPage";
import { useDirectContext } from "..";
import useWindowSize from "../../../hooks/useWindowSize";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { Spinner } from "../../../components/Spinner";
import { UserNamesI } from "../../../types";
import { chatTitleHandler } from "../Inbox/ChatItem";
import { RequestFooter } from "./components/RequestFooter";

const LIMIT = 26;

export type messageLikeType = {
  reaction: string;
  user: UserNamesI;
  message: MessageProps;
};

export type MessageProps = {
  id: string;
  chatId: string;
  createdAt: string;
  type: "text" | "post" | "sticker" | "photo" | "reply" | "activity";
  user: UserNamesI;
  text: string;
  sticker?: string;
  sentBy: UserNamesI;
  isRead: boolean;
  readBy: UserNamesI[];
  readAt: string;
  post?: PostValues;
  photo?: { id: string; aspectRatio: number };
  likesCount: number;
  isLiked: boolean;
  reactionsPage: { reactions: messageLikeType[] };
  topReactions: string[];
  like: messageLikeType;
  message: MessageProps;
};

export const Chat: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const {
    queryVarsDispatch,
    resultUniqueChat,
    setHeaderAttrs,
    setIsFooterNavHidden,
    viewer,
    setFooterMessage,
    chatContainerRef,
    messagesDate,
  } = useGlobalContext() as globalContextType;
  const { messageToReply, setIsRequests } = useDirectContext();
  const { height } = useWindowSize();

  const [messagesResult] = useQuery({
    query: UniqueChatMessages,
    variables: {
      chatId: params.chatId,
      limit: LIMIT,
      skip: 0,
      date: messagesDate,
    },
  });

  const [result] = useSubscription({
    query: NewMessage,
    variables: { chatId: params.chatId },
  });

  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: LIMIT,
    type: "chat",
  });
  useEffect(() => {
    if (scrollState.moreVars.length === 0) return;
    scrollDispatch({ type: "reset" });
  }, [location]);

  const [resultPhotoUpload, photoUploadMutation] =
    useMutation(UploadMessagePhoto);

  const [resultAllMessageDates] = useQuery({
    query: AllMessageDates,
    variables: {
      chatId: params.chatId,
      limit: LIMIT + scrollState.moreVars.length * LIMIT,
      skip: 0,
      date: messagesDate,
    },
  });

  const [photoUploadUrl, setPhotoUploadUrl] = useState<{
    url: string;
    aspectRatio: number;
  } | null>(null);
  const [visableDates, setVisableDates] = useState<string[] | null>();
  const [isInfo, setIsInfo] = useState(false);
  const [chatHeight, setChatHeight] = useState(0);
  const isRequest = resultUniqueChat.data?.uniqueChat.isRequest;
  const uniqueChat = resultUniqueChat.data?.uniqueChat;

  const infoToggle = () => {
    setIsInfo((prevState) => (prevState ? false : true));
  };

  useEffect(() => {
    document.title = "Chats • Instagram";

    setIsFooterNavHidden(true);
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.uniqueChat,
        variables: {
          chatId: params.chatId,
          limit: LIMIT,
          skip: 0,
          date: messagesDate,
        },
      },
    });
    return () => {
      setIsFooterNavHidden(false);
    };
  }, [result]);

  useEffect(() => {
    if (isInfo) setIsInfo(false);
  }, [location]);

  useLayoutEffect(() => {
    if (!resultUniqueChat.data || isInfo) return;

    if (isRequest) setIsRequests(true);

    const { name, members } = resultUniqueChat.data.uniqueChat;
    const viewerId = viewer.data?.viewer.id;
    const withoutViewer = members.filter(
      (member: UserNamesI) => member.id !== viewer.data?.viewer.id
    );
    const chatTitle = name ? name : chatTitleHandler(members, viewerId);
    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: chatTitle,
      profiles: withoutViewer,
      rightButton: RightHeaderButton.info,
      rightOnClick: infoToggle,
    });
  }, [resultUniqueChat.data, isInfo]);

  useLayoutEffect(() => {
    if (!resultAllMessageDates.data) return;
    const { messages } = resultAllMessageDates.data?.chatPagedMessages;
    if (messages.length !== 0) {
      const dates = [messages[messages.length - 1].createdAt];
      messages
        .slice()
        .reverse()
        .forEach((message: MessageProps) => {
          if (hoursElapsed(dates[dates.length - 1], message.createdAt) >= 2) {
            dates.push(message.createdAt);
          }
        });
      setVisableDates(dates);
    }
  }, [resultAllMessageDates.data]);

  const seenByHandler = (readBy: UserNamesI[]) => {
    if (uniqueChat?.members.length === 2) return "seen";
    if (readBy.length === uniqueChat?.members.length - 1) return "seen by all";
    return `seen by ${readBy.map((user) => user.username)}`;
  };

  const fileChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0)
      return setPhotoUploadUrl(null);
    const url = URL.createObjectURL(e.target.files[0]);
    const type = "message";
    const { width, height } = await getAspectRatio(url, type);
    const aspectRatio = width / height;
    setPhotoUploadUrl({ url, aspectRatio });
    let base64;
    try {
      base64 = await toBase64(e.target.files[0]);
    } catch (error) {
      setFooterMessage("Error uploading photo");
      console.error(error);
    }

    photoUploadMutation({ base64, aspectRatio, chatId: params.chatId }).then(
      (result) => {
        setPhotoUploadUrl(null);

        if (result.error) {
          setFooterMessage("Error uploading photo.");
          queryVarsDispatch({
            type: "add",
            payload: {
              query: PreloadQuery.uniqueChat,
              variables: { chatId: params.chatId },
            },
          });
        }
      }
    );
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const { height } = scrollRef.current.getBoundingClientRect();
    setChatHeight(height);
  }, [resultUniqueChat, messageToReply, height]);

  useLayoutEffect(() => {
    if (
      !scrollRef.current ||
      scrollRef.current?.scrollTop !== 0 ||
      messageToReply
    )
      return;

    const resizeObserver = new ResizeObserver(() => {
      if (!scrollRef.current) return;
      const { offsetHeight } = scrollRef.current;
      const heightDiff = offsetHeight - chatHeight;
      scrollRef.current.scrollTop = heightDiff;
    });

    resizeObserver.observe(scrollRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [chatHeight]);

  return (
    <>
      {isInfo ? (
        <ChatInfo infoToggle={infoToggle} {...uniqueChat} />
      ) : (
        <>
          <MessagesContainer ref={chatContainerRef}>
            <ScrollContainer ref={scrollRef}>
              {photoUploadUrl && (
                <Container isViewer={true}>
                  <div>
                    <SpinnerContainer>
                      <Spinner size="large" />
                    </SpinnerContainer>
                    <PhotoContainer>
                      <Image
                        height={234 / photoUploadUrl.aspectRatio}
                        src={photoUploadUrl.url}
                      />
                    </PhotoContainer>
                  </div>
                </Container>
              )}

              {scrollState.moreVars.map((vars, index, varsArray) => {
                if (!params.chatId) return null;
                return (
                  <MessagesPage
                    key={index}
                    seenByHandler={seenByHandler}
                    scrollRef={scrollRef}
                    scrollDispatch={scrollDispatch}
                    variables={{
                      ...vars,
                      chatId: params.chatId,
                      date: messagesDate,
                    }}
                    visableDates={visableDates}
                  />
                );
              })}
            </ScrollContainer>
          </MessagesContainer>
          {isRequest ? (
            <RequestFooter
              createdBy={resultUniqueChat.data?.uniqueChat.createdBy}
              id={uniqueChat.id}
            />
          ) : (
            <MessageInput
              fileChangeHandler={fileChangeHandler}
              scrollRef={scrollRef}
              scrollDispatch={scrollDispatch}
            />
          )}
        </>
      )}
    </>
  );
};
