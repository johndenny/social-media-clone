import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { useMutation } from "urql";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { PaddedButton } from "../PaddedButton";
import { ReactComponent as FollowingSvg } from "../../assets/svgs/following.svg";
import {
  CreateFollowRequest,
  Follow,
  RemoveFollowRequest,
  Unfollow,
} from "../../graphQL/mutations";
import { UserListI } from "../../types";
import { Button } from "./styled";
import { Spinner } from "../Spinner";

interface Props {
  user: UserListI;
  followingId: string;
  childrenType?: "icon";
  isHomepage?: boolean;
  isWide?: boolean;
  isInline?: boolean;
}

export const FollowButton: React.FC<Props> = ({
  user,
  followingId,
  childrenType,
  isHomepage,
  isWide,
  isInline,
}) => {
  const { username, photoVersion, isFollowing, isRequested } = user;
  const {
    modalAttrs,
    setFooterMessage,
    setModalAttrs,
    unfollowButtonRef,
    viewer,
  } = useGlobalContext() as globalContextType;

  const [removeFollowRequestResult, removeFollowRequestMutation] =
    useMutation(RemoveFollowRequest);
  const [followRequestResult, followRequestMutation] =
    useMutation(CreateFollowRequest);
  const [followResult, followMutation] = useMutation(Follow);
  const [unfollowResult, unfollowMutation] = useMutation(Unfollow);

  const isLoggedIn = Boolean(viewer.data);
  const isFetching =
    unfollowResult.fetching ||
    followResult.fetching ||
    followRequestResult.fetching ||
    removeFollowRequestResult.fetching;

  const follow = () => {
    console.log({ user });
    if (user.isPrivate)
      return followRequestMutation({ receiveId: user.id }).then((result) => {
        if (result.error) setFooterMessage("Server error.");
      });
    followMutation({ username }).then((result) => {
      if (result.error) {
        setFooterMessage("Server error.");
      }
    });
  };

  const unfollow = () => {
    setModalAttrs(null);

    if (user.isPrivate)
      return removeFollowRequestMutation({
        receiveId: user.id,
        requestId: viewer.data?.viewer.id,
      }).then((result) => {
        if (result.error) console.error(result.error);
      });

    unfollowMutation({ username }).then((result) => {
      if (result.error) console.error(result.error);
    });
  };

  const clickHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) return setModalAttrs({ type: "log-in" });

    if (isFollowing && !modalAttrs) {
      return setModalAttrs({
        variables: { photoVersion, id: followingId, username: username },
        type: "follow",
      });
    }
    if ((isFollowing && modalAttrs) || isRequested) return unfollow();

    follow();
  };

  const textHandler = () => {
    if (isFollowing) return "Following";
    if (isRequested) return "Requested";
    return "Follow";
  };

  if (isInline)
    return (
      <Button
        isFollowing={isFollowing}
        isHomepage={isHomepage}
        onClick={clickHandler}
      >
        {isFetching ? <Spinner size="small" /> : textHandler()}
      </Button>
    );

  return (
    <PaddedButton
      fillType={isFollowing || isRequested ? "secondary" : undefined}
      padding={isWide ? "var(--wide-button)" : "var(--slim-button)"}
      fetching={isFetching}
      onClick={clickHandler}
      ref={
        modalAttrs?.type === "follow" &&
        modalAttrs?.variables.username === username
          ? unfollowButtonRef
          : null
      }
    >
      {childrenType === "icon" && isFollowing ? (
        <FollowingSvg height={18} />
      ) : (
        textHandler()
      )}
    </PaddedButton>
  );
};
