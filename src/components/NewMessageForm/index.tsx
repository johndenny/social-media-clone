import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { LocationState } from "../../App";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import {
  AddPeople,
  ForwardMessage,
  NewChat,
  SharePost,
} from "../../graphQL/mutations";
import { UserSearch, ViewerSoloChats } from "../../graphQL/queries";
import useGlobalContext from "../../hooks/useGlobalContext";
import { MessageProps } from "../../routes/Direct/Chat";
import { ListContainer } from "../../routes/Post/Comments/styled";
import { UserListI, UserNamesI } from "../../types";
import {
  HeaderMobile,
  LeftHeaderButton,
  RightHeaderButton,
} from "../HeaderMobile";
import { ChatList } from "./components/ChatList";

import { MessageProfileList } from "./components/MessageProfileList";
import { RecipientCard } from "./components/RecipientCard";
import {
  ButtonContainer,
  Line,
  MessageContainer,
  MessageInput,
  RecipientContainer,
  SearchContainer,
  SearchInput,
  SendButton,
  ToHeader,
} from "./styled";
import { SuggestedHeader } from "./styled/SuggestedHeader";

export type RecipientType = {
  username: string;
  userId: string;
  chatId: string;
  title: string;
};

export type ToggleRecipientProps = {
  username: string;
  userId: string;
  chatId: string;
  title: string;
};

interface Props {
  postId?: string;
  members?: UserNamesI[];
  message?: MessageProps;
}

export const NewMessageForm: React.FC<Props> = ({
  postId,
  members,
  message,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setFooterMessage,
    viewer,
    resultViewerChats,
    setModalAttrs,
    isMobile,
    queryVarsDispatch,
    messagesDate,
  } = useGlobalContext() as globalContextType;
  const [searchText, setSearchText] = useState("");
  const [messageText, setMessageText] = useState("");
  const [recipients, setRecipients] = useState<RecipientType[]>([]);
  const [searchResult] = useQuery({
    query: UserSearch,
    variables: { filter: searchText },
  });
  const [resultNewChat, newChatMutation] = useMutation(NewChat);
  const [resultSharePost, sharePostMutation] = useMutation(SharePost);
  const [resultAddPeople, addPeopleMutation] = useMutation(AddPeople);
  const [resultForwardMessage, forwardMessageMutation] =
    useMutation(ForwardMessage);
  const [soloChatsResult] = useQuery({
    query: ViewerSoloChats,
    variables: { limit: 16, skip: 0, date: messagesDate },
  });

  const [searchList, setSearchList] = useState<UserListI[] | null>(null);
  const recipientsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isNewChat = !postId && !members && !message;
  const chats = isNewChat
    ? soloChatsResult.data?.viewerSoloChats
    : resultViewerChats.data?.viewerChatsPaged;

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.viewerChats,
        variables: { limit: 16, skip: 0, date: messagesDate },
      },
    });
  }, []);

  useEffect(() => {
    if (searchResult.data && searchText !== "")
      return setSearchList(searchResult.data.usersFilter);
    setSearchList(null);
  }, [searchResult.data]);

  const toggleRecipient = ({
    username,
    userId,
    chatId,
    title,
  }: ToggleRecipientProps) => {
    if (userId === viewer.data?.viewer.id)
      return setFooterMessage("Cannot message yourself.");

    const memberIndex = members?.findIndex((member) => member.id === userId);
    if (members && memberIndex !== -1) return;

    const index = recipients.findIndex((user) => user.username === username);
    if (index === -1) {
      setSearchList(null);
      setSearchText("");
      return setRecipients([
        ...recipients,
        { username, userId, chatId, title },
      ]);
    }

    const newRecipients = recipients;
    newRecipients.splice(index, 1);
    return setRecipients([...newRecipients]);
  };

  const createNewChat = () => {
    const idArray = recipients.map((user) => user.userId);
    newChatMutation({ members: idArray }).then((result) => {
      if (result.error) setFooterMessage("New message failed.");
      if (result.data) setModalAttrs(null);
      navigate(`/direct/t/${result.data.newChat.id}/`, { replace: true });
    });
  };

  const addPeople = () => {
    const idArray = recipients.map((user) => user.userId);
    addPeopleMutation({ members: idArray, chatId: params.chatId }).then(
      (result) => {
        if (result.error) setFooterMessage("Error adding people");
        if (result.data) setModalAttrs(null);
      }
    );
  };

  const forwardPost = () => {
    if (!message) return;

    const { text, post, photo } = message;
    const ids = recipients.map((recipient) =>
      recipient.userId ? recipient.userId : recipient.chatId
    );

    forwardMessageMutation({
      text,
      postId: post?.id,
      photoId: photo?.id,
      ids,
    }).then((result) => {
      if (result.error) setFooterMessage("Message failed to send.");
      if (result.data) setModalAttrs(null);
    });
  };

  const sharePost = () => {
    const ids = recipients.map((recipient) =>
      recipient.userId ? recipient.userId : recipient.chatId
    );
    sharePostMutation({ text: messageText, postId, ids }).then((result) => {
      if (result.error) setFooterMessage("Message failed to send.");
      if (result.data) setModalAttrs(null);
    });
  };

  useEffect(() => {
    if (recipientsRef.current)
      recipientsRef.current.scrollLeft = recipientsRef.current.scrollWidth;
    if (inputRef.current) inputRef.current.focus();
  }, [recipients]);

  return (
    <>
      {postId && (
        <HeaderMobile
          title="Share"
          rightButton={RightHeaderButton.close}
          rightOnClick={() => setModalAttrs(null)}
        />
      )}
      {message && (
        <HeaderMobile
          title="Share"
          leftButton={LeftHeaderButton.close}
          leftOnClick={() => setModalAttrs(null)}
          rightButton={RightHeaderButton.send}
          rightOnClick={forwardPost}
        />
      )}
      {members && (
        <HeaderMobile
          leftButton={LeftHeaderButton.backChevron}
          leftOnClick={() => setModalAttrs(null)}
          title="Add People"
          rightButton={RightHeaderButton.next}
          rightOnClick={addPeople}
        />
      )}
      {isNewChat && (
        <HeaderMobile
          leftButton={
            isMobile ? LeftHeaderButton.backChevron : LeftHeaderButton.close
          }
          leftOnClick={() =>
            isMobile
              ? navigate(-1)
              : navigate(`${(location.state as LocationState).background}`)
          }
          title="New message"
          rightButton={RightHeaderButton.next}
          rightOnClick={createNewChat}
        />
      )}

      <SearchContainer>
        <ToHeader>To:</ToHeader>
        <RecipientContainer ref={recipientsRef}>
          {recipients.map((profile) => {
            return (
              <RecipientCard
                key={profile.username}
                recipient={profile}
                toggleRecipient={toggleRecipient}
              />
            );
          })}
          <SearchInput
            ref={inputRef}
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </RecipientContainer>
      </SearchContainer>

      <ListContainer>
        {searchList !== null ? (
          <MessageProfileList
            profiles={searchList}
            onClick={toggleRecipient}
            recipients={
              members
                ? [
                    ...recipients,
                    ...members.map((member) => {
                      return {
                        username: member.username,
                        userId: member.id,
                        chatId: "",
                        title: "",
                      };
                    }),
                  ]
                : recipients
            }
          />
        ) : (
          <>
            <SuggestedHeader>Suggested</SuggestedHeader>
            <ChatList
              chats={chats?.chats}
              onClick={toggleRecipient}
              recipients={
                members
                  ? [
                      ...recipients,
                      ...members.map((member) => {
                        return {
                          username: member.username,
                          userId: member.id,
                          chatId: "",
                          title: "",
                        };
                      }),
                    ]
                  : recipients
              }
            />
          </>
        )}
      </ListContainer>
      {postId && (
        <>
          <Line />
          <MessageContainer disabled={recipients.length === 0}>
            <MessageInput
              placeholder="Write a message..."
              spellCheck="true"
              type="text"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
          </MessageContainer>
          <ButtonContainer>
            <SendButton onClick={sharePost} disabled={recipients.length === 0}>
              {recipients.length > 1 ? "Send separately" : "Send"}
            </SendButton>
          </ButtonContainer>
        </>
      )}
    </>
  );
};
