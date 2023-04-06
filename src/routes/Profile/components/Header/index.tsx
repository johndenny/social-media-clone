import React from "react";
import {
  HeaderStyled,
  ProfilePictureContainer,
  TextHeaderContainer,
  TextHeader,
  Button,
  StyledLink,
  Section,
} from "./styled";
import optionsDotsSvg from "../../../../assets/svgs/optionsDots.svg";
import { ProfilePhotoButton } from "../../../../components/ProfilePhotoButton";
import { FollowButton } from "../../../../components/FollowButton";
import { UserProfileI } from "../../../../types";
import { ProfilePhoto } from "../../../../components/ProfilePhoto";
import { PaddedButton } from "../../../../components/PaddedButton";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../context/GlobalContext";
import { ReactComponent as ChevronSvg } from "../../../../assets/svgs/chevronDown.svg";

interface Props {
  user: UserProfileI;
  isViewingOwnProfile: boolean;
  isSuggestionsVisible: boolean;
  setIsSuggestionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  messageHandler: () => void;
  messageFetching: boolean;
}

export const Header: React.FC<Props> = ({
  user,
  isViewingOwnProfile,
  isSuggestionsVisible,
  setIsSuggestionsVisible,
  messageHandler,
  messageFetching,
}) => {
  const { viewer } = useGlobalContext() as globalContextType;
  const isLoggedIn = Boolean(viewer.data);
  const isPrivate = user.isPrivate && !user.isFollowing;

  return (
    <HeaderStyled>
      <ProfilePictureContainer>
        {isViewingOwnProfile ? (
          <ProfilePhotoButton user={user} height="77px" />
        ) : (
          <ProfilePhoto height="77px" {...user} isWithoutLink={true} />
        )}
      </ProfilePictureContainer>
      <Section>
        <TextHeaderContainer>
          <TextHeader>{user?.username}</TextHeader>
          {!isViewingOwnProfile && (
            <Button>
              <img alt="Options" src={optionsDotsSvg} />
            </Button>
          )}
        </TextHeaderContainer>
        <div style={{ flexDirection: "row", gap: "8px", maxWidth: "250px" }}>
          {!isViewingOwnProfile && !isPrivate && (
            <PaddedButton
              onClick={messageHandler}
              fetching={messageFetching}
              fillType="secondary"
              style={{ flex: 1 }}
            >
              Message
            </PaddedButton>
          )}
          {isViewingOwnProfile ? (
            <StyledLink to="/accounts/edit/">Edit profile</StyledLink>
          ) : (
            <FollowButton followingId={user.id} user={user} />
          )}
          {!isViewingOwnProfile && !isPrivate && isLoggedIn && (
            <PaddedButton
              fillType={user.isFollowing ? "secondary" : undefined}
              style={{
                height: "30px",
                alignItems: "center",
              }}
              onClick={() =>
                setIsSuggestionsVisible((prevState) =>
                  prevState ? false : true
                )
              }
            >
              <div
                style={isSuggestionsVisible ? { transform: "scale(-1)" } : {}}
              >
                <ChevronSvg fill={user.isFollowing ? undefined : "white"} />
              </div>
            </PaddedButton>
          )}
        </div>
      </Section>
    </HeaderStyled>
  );
};
