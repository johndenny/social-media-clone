import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import {
  Container,
  FollowedByText,
  List,
  RecentButton,
  SecondaryText,
} from "./styled";

import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { FollowButton } from "../FollowButton";
import { ProfilePhoto } from "../ProfilePhoto";
import { ReactComponent as CloseSmallSvg } from "../../assets/svgs/closeSmall.svg";
import { useMutation } from "urql";
import { RemoveFollower, RemoveUserSearch } from "../../graphQL/mutations";
import { ReactComponent as SelectedSvg } from "../../assets/svgs/selected.svg";
import { ReactComponent as UnSelectedSvg } from "../../assets/svgs/unselected.svg";
import { UsernameLink } from "../UsernameLink";
import { UserListI } from "../../types";
import { PaddedButton } from "../PaddedButton";

interface Props {
  user: UserListI;
  photoHeight: string;
  border?: "top" | "bottom";
  isRecent?: boolean;
  isMessage?: boolean;
  isHomepage?: boolean;
  isWithoutLink?: boolean;
  isWithoutModal?: boolean;
  isViewersFollowers?: boolean;
}

export const ProfileListItem = React.memo(function ListItem({
  user,
  photoHeight,
  border,
  isRecent,
  isMessage,
  isHomepage,
  isWithoutLink,
  isWithoutModal,
  isViewersFollowers,
}: Props) {
  const { id, username, fullName, isFollowing } = user;

  const { viewer, setFooterMessage } = useGlobalContext() as globalContextType;

  const [removeUserSearchResult, removeUserSearch] =
    useMutation(RemoveUserSearch);

  const [removeFollowerResult, removeFollower] = useMutation(RemoveFollower);

  const removeRecentSearch = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeUserSearch({ userId: id });
  };

  const removeFollowerHandler = () => {
    removeFollower({ followerId: id }).then((result) => {
      if (result.error) setFooterMessage("Server error.");
    });
  };

  return (
    <List border={border} isHomepage={isHomepage}>
      <Container>
        <ProfilePhoto
          {...user}
          height={photoHeight}
          isWithoutLink={isWithoutLink}
          isWithoutModal={isWithoutLink || isWithoutModal}
        />
        <div
          style={{
            minWidth: "0",
            flex: 1,
          }}
        >
          <div style={{ flexDirection: "row", gap: "4px" }}>
            <UsernameLink
              username={username}
              isWithoutModal={isWithoutLink || isWithoutModal}
              isWithoutLink={isWithoutLink}
            />

            {isViewersFollowers &&
              isFollowing !== undefined &&
              viewer?.data?.viewer.username !== username && (
                <>
                  {"•"}
                  <FollowButton
                    isInline={true}
                    isHomepage={isHomepage}
                    followingId={id}
                    user={user}
                  />
                </>
              )}
          </div>

          {!isHomepage && <SecondaryText>{fullName}</SecondaryText>}
          {user.mutualFollowers?.count === 0 ? (
            <>{isHomepage && <SecondaryText>{fullName}</SecondaryText>}</>
          ) : (
            <>
              {user.mutualFollowers && (
                <FollowedByText>
                  followed by {user.mutualFollowers.users[0].username}
                  {user.mutualFollowers.count > 1 &&
                    ` + ${user.mutualFollowers.count - 1} more`}
                </FollowedByText>
              )}
            </>
          )}
        </div>
      </Container>
      {isMessage !== undefined && (
        <>{isMessage ? <SelectedSvg /> : <UnSelectedSvg />}</>
      )}
      {isRecent && (
        <RecentButton onClick={removeRecentSearch}>
          <CloseSmallSvg stroke="#8e8e8e" />
        </RecentButton>
      )}
      {isFollowing !== undefined && viewer?.data?.viewer.username !== username && (
        <>
          {!isViewersFollowers ? (
            <FollowButton
              isInline={isHomepage || isViewersFollowers}
              isHomepage={isHomepage}
              followingId={id}
              user={user}
            />
          ) : (
            <PaddedButton
              onClick={removeFollowerHandler}
              fetching={removeFollowerResult.fetching}
              fillType="secondary"
              margin="0 0 0 8px"
            >
              Remove
            </PaddedButton>
          )}
        </>
      )}
    </List>
  );
});
