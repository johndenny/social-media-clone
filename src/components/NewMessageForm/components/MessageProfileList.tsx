import React from "react";
import { RecipientType, ToggleRecipientProps } from "..";
import { UserListI } from "../../../types";
import { ProfileListItem } from "../../ProfileListItem";
import { ProfileButton, ProfileListContainer } from "../styled";

interface Props {
  profiles: UserListI[];
  onClick: ({ username, userId, chatId, title }: ToggleRecipientProps) => void;
  recipients: RecipientType[];
}

export const MessageProfileList: React.FC<Props> = ({
  profiles,
  onClick,
  recipients,
}) => {
  return (
    <ProfileListContainer>
      {profiles?.map((profile) => {
        const recipientIndex = recipients.findIndex(
          (user) => user.username === profile.username
        );
        return (
          <li key={profile.id}>
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
                photoHeight="44px"
                isMessage={recipientIndex !== -1}
              />
            </ProfileButton>
          </li>
        );
      })}
    </ProfileListContainer>
  );
};
