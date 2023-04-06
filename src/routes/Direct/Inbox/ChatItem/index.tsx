import React from "react";
import { useParams } from "react-router-dom";
import { ChatType } from "..";
import { DoubleProfilePhoto } from "../../../../components/DoubleProfilePhoto";
import { PreloadLink } from "../../../../components/PreloadLink";
import { ProfilePhoto } from "../../../../components/ProfilePhoto";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { UserListI, UserNamesI } from "../../../../types";
import { commentDate } from "../../../../utils/DateFormat";
import {
  Activity,
  ChatCardContainer,
  TextContainer,
  TitleText,
  UnreadIcon,
} from "./styled";

interface Props {
  chat: ChatType;
}

export const ChatItem: React.FC<Props> = ({ chat }) => {
  const params = useParams();
  const { resultUniqueChat, viewer, messagesDate } =
    useGlobalContext() as globalContextType;

  const filteredMembers = chat.members.filter(
    (member: UserListI) => member.id !== viewer.data?.viewer.id
  );
  const chatTitle = chat.name
    ? chat.name
    : chatTitleHandler(chat.members, viewer.data?.viewer.id);

  const textHandler = (chat: ChatType) => {
    const { lastestMessage, members } = chat;
    const isGroup = members.length > 2;
    const { username } = lastestMessage.sentBy;
    switch (true) {
      case lastestMessage.like?.reaction === "❤️":
        return isGroup ? `${username} liked a message` : `Liked your message`;

      case lastestMessage.like !== null:
        let recipient = `${lastestMessage.like.message.sentBy.username}'s`;
        if (
          lastestMessage.like.message.sentBy.username ===
          viewer.data.viewer.username
        )
          recipient = "your";
        return isGroup
          ? `${username} reacted ${lastestMessage.like.reaction} to ${recipient} message`
          : `Reacted ${lastestMessage.like.reaction} to ${recipient} message`;

      case lastestMessage.post !== null:
        return isGroup ? `${username} sent a post` : "Sent a post";

      case lastestMessage.photo !== null:
        return isGroup ? `${username} sent a photo` : "Sent a photo";

      case lastestMessage.sticker !== null:
        return isGroup ? `${username} sent a sticker` : "Sent a sticker";

      default:
        return isGroup
          ? `${username}: ${lastestMessage.text}`
          : lastestMessage.text;
    }
  };

  return (
    <PreloadLink
      key={chat.id}
      to={`/direct/t/${chat.id}/`}
      query={PreloadQuery.uniqueChat}
      queryResult={resultUniqueChat}
      variables={{ chatId: chat.id, date: messagesDate }}
    >
      <ChatCardContainer selected={params.chatId === chat.id}>
        {filteredMembers.length === 1 ? (
          <ProfilePhoto
            height={"56px"}
            photoVersion={filteredMembers[0].photoVersion}
            id={filteredMembers[0].id}
            username={filteredMembers[0].username}
            isWithoutLink={true}
            isWithoutModal={true}
          />
        ) : (
          <DoubleProfilePhoto
            height={"56px"}
            profiles={[filteredMembers[0], filteredMembers[1]]}
          />
        )}

        <TextContainer>
          <TitleText isRead={chat.lastestMessage && chat.lastestMessage.isRead}>
            {chatTitle}
          </TitleText>
          {chat.lastestMessage && (
            <Activity>
              <TitleText isRead={chat.lastestMessage.isRead}>
                {textHandler(chat)}
              </TitleText>
              <span>·</span>
              <span>{commentDate(chat.lastestMessage.createdAt)}</span>
            </Activity>
          )}
        </TextContainer>
        {chat.lastestMessage && !chat.lastestMessage.isRead && (
          <UnreadIcon></UnreadIcon>
        )}
      </ChatCardContainer>
    </PreloadLink>
  );
};

export const chatTitleHandler = (members: UserNamesI[], viewerId: string) => {
  const filteredMembers = members.filter(
    (member: UserNamesI) => member.id !== viewerId
  );
  const membersNames = filteredMembers.map((member: any) => {
    return member.fullName ? member.fullName : member.username;
  });
  switch (true) {
    case membersNames.length === 1:
      return membersNames[0];
    case membersNames.length === 2:
      return `${membersNames[0]} and ${membersNames[1]}`;
    case membersNames.length === 3:
      return `${membersNames[0]}, ${membersNames[1]} and ${membersNames[2]}`;
    case membersNames.length > 3:
      return `${membersNames[0]}, ${membersNames[1]}, ${membersNames[2]} and ${
        filteredMembers.length - 3
      } ${filteredMembers.length - 3 === 1 ? "other" : "others"}`;
  }
};
