import React from "react";
import { ProfilePhotoButton } from "../../../../components/ProfilePhotoButton";
import { StyledLink, TextHeader, TextHeaderContainer } from "../Header/styled";
import { CountsWideScreen } from "../CountsWideScreen";
import { ProfileText } from "../ProfileText";
import { Header, ProfilePhotoContainer, Section } from "./styled";
import { FollowButton } from "../../../../components/FollowButton";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../context/GlobalContext";
import { ReactComponent as OptionsSvg } from "../../../../assets/svgs/options.svg";
import { ReactComponent as OptionsDotsSvg } from "../../../../assets/svgs/optionsDots.svg";
import { UserProfileI } from "../../../../types";
import { ProfilePhoto } from "../../../../components/ProfilePhoto";
import { PaddedButton } from "../../../../components/PaddedButton";
import { ReactComponent as ChevronSvg } from "../../../../assets/svgs/chevronDown.svg";
import { MutualFollowers } from "../MutualFollowers";

interface Props {
  user: UserProfileI;
  isViewingOwnProfile: boolean;
  isMobile: boolean | null;
  isSuggestionsVisible: boolean;
  setIsSuggestionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  messageHandler: () => void;
  messageFetching: boolean;
}

export const HeaderWideScreen: React.FC<Props> = ({
  user,
  isViewingOwnProfile,
  isMobile,
  setIsSuggestionsVisible,
  isSuggestionsVisible,
  messageHandler,
  messageFetching,
}) => {
  const { setModalAttrs, viewer } = useGlobalContext() as globalContextType;

  const isLoggedIn = Boolean(viewer.data);
  const isPrivate = user.isPrivate && !user.isFollowing;

  return (
    <Header>
      <ProfilePhotoContainer>
        {isViewingOwnProfile ? (
          <ProfilePhotoButton user={user} height="150px" />
        ) : (
          <ProfilePhoto height="150px" {...user} isWithoutLink={true} />
        )}
      </ProfilePhotoContainer>
      <Section>
        <TextHeaderContainer>
          <TextHeader>{user?.username}</TextHeader>
          {!isViewingOwnProfile && !isPrivate && (
            <PaddedButton
              fetching={messageFetching}
              fillType="secondary"
              onClick={messageHandler}
            >
              Message
            </PaddedButton>
          )}

          {isViewingOwnProfile ? (
            <StyledLink to="/accounts/edit/">Edit profile</StyledLink>
          ) : (
            <FollowButton
              childrenType="icon"
              followingId={user.id}
              user={user}
              isWide={true}
            />
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

          {isViewingOwnProfile ? (
            <>
              {isMobile === false && (
                <button
                  style={{ padding: "0 4px" }}
                  onClick={() =>
                    setModalAttrs({
                      type: "viewer-profile-options",
                    })
                  }
                >
                  <OptionsSvg />
                </button>
              )}
            </>
          ) : (
            <>
              {isLoggedIn && (
                <button style={{ padding: "0 4px" }}>
                  <OptionsDotsSvg height={32} width={32} />
                </button>
              )}
            </>
          )}
        </TextHeaderContainer>
        <CountsWideScreen
          counts={user.counts}
          username={user.username}
          isPrivate={
            user.isPrivate && !user.isFollowing && !isViewingOwnProfile
          }
        />
        <ProfileText fullName={user.fullName} bio={user.bio} url={user.url} />
        {!isViewingOwnProfile &&
          user.mutualFollowers &&
          user.mutualFollowers.users.length !== 0 && (
            <MutualFollowers mutualFollowers={user.mutualFollowers} />
          )}
      </Section>
    </Header>
  );
};
