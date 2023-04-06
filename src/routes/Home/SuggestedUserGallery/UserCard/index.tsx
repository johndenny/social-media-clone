import React from "react";
import { FollowButton } from "../../../../components/FollowButton";
import { ProfilePhoto } from "../../../../components/ProfilePhoto";
import { UserListI } from "../../../../types";
import { CloseButton, CloseSprite, Container, TextContainer } from "./styled";

interface Props {
  profile: UserListI;
  isWide: boolean;
  index: number;
  hideUserHandler: (user: UserListI, index: number) => Promise<void>;
  isSuggestedUsersPopular: boolean;
}

export const UserCard: React.FC<Props> = ({
  profile,
  isWide,
  index,
  hideUserHandler,
  isSuggestedUsersPopular,
}) => {
  const { id, username, fullName } = profile;

  return (
    <Container isWide={isWide}>
      <CloseButton onClick={() => hideUserHandler(profile, index)}>
        <CloseSprite></CloseSprite>
      </CloseButton>
      <ProfilePhoto
        {...profile}
        height={isWide ? "54px" : "77px"}
        isWithoutModal={true}
      />
      <TextContainer isWide={isWide}>
        <span>{fullName || username}</span>
        <span style={{ color: "rgb(var(--secondary-text))" }}>
          {isSuggestedUsersPopular ? "Popular" : "Suggestion for you"}
        </span>
      </TextContainer>
      <FollowButton followingId={id} user={profile} />
    </Container>
  );
};
