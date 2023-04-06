import React from "react";
import { RecipientType, ToggleRecipientProps } from "..";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { ChatType } from "../../../routes/Direct/Inbox";
import { DoubleProfilePhoto } from "../../DoubleProfilePhoto";
import {
  Container,
  List,
  PrimaryText,
  SecondaryText,
} from "../../ProfileListItem/styled";
import { ReactComponent as SelectedSvg } from "../../../assets/svgs/selected.svg";
import { ReactComponent as UnSelectedSvg } from "../../../assets/svgs/unselected.svg";
import { ProfileButton, TextContainer } from "../styled";
import { ProfileListItem } from "../../ProfileListItem";
import { chatTitleHandler } from "../../../routes/Direct/Inbox/ChatItem";

interface Props {
  chats: ChatType[];
  onClick: ({ username, userId, chatId, title }: ToggleRecipientProps) => void;
  recipients: RecipientType[];
}

export const ChatList: React.FC<Props> = ({ chats, onClick, recipients }) => {
  const { viewer } = useGlobalContext() as globalContextType;
  return (
    <ul>
      {chats?.map((chat) => {
        const recipientIndex = recipients.findIndex(
          (recipient) => recipient.chatId === chat.id
        );
        const title = chatTitleHandler(chat.members, viewer.data?.viewer.id);
        if (chat.members.length === 2) {
          const memberIndex = chat.members.findIndex(
            (member) => member.id !== viewer.data?.viewer.id
          );
          const profile = chat.members[memberIndex];
          const recipientIndex = recipients.findIndex(
            (recipient) => recipient.userId === profile.id
          );
          return (
            <li key={chat.id}>
              <ProfileButton
                onClick={() =>
                  onClick({
                    username: profile.username,
                    userId: profile.id,
                    chatId: "",
                    title: "",
                  })
                }
              >
                <ProfileListItem
                  user={profile}
                  photoHeight="40px"
                  isMessage={recipientIndex !== -1}
                  isWithoutLink={true}
                />
              </ProfileButton>
            </li>
          );
        }
        return (
          <List key={chat.id}>
            <ProfileButton
              onClick={() =>
                onClick({ username: "", userId: "", chatId: chat.id, title })
              }
            >
              <Container>
                <DoubleProfilePhoto height={"40px"} profiles={chat.members} />
                <TextContainer>
                  <PrimaryText>{chat.name ? chat.name : title}</PrimaryText>
                  <SecondaryText>{title}</SecondaryText>
                </TextContainer>
                {recipientIndex !== -1 ? <SelectedSvg /> : <UnSelectedSvg />}
              </Container>
            </ProfileButton>
          </List>
        );
      })}
    </ul>
  );
};
