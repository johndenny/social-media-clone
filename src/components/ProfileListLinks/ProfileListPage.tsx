import React, { Children, useEffect } from "react";
import { useQuery } from "urql";
import {
  PageVariablesI,
  ScrollActionType,
} from "../../hooks/useInfinitePagination";
import { ProfileListLinks } from ".";
import { messageLikeType } from "../../routes/Direct/Chat";
import { MessageLikeItem } from "../Modal/components/MessageLikeItem";
import { Spinner } from "../Spinner";
import { ProfileListLinksPlaceholder } from "./ProfileListLinksPlaceholder";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType } from "../../context/GlobalContext";

interface ProfileListPageVariablesI extends PageVariablesI {
  username?: string;
  postId?: string;
  commentId?: string;
  replyId?: string;
  messageId?: string;
}

interface Props {
  variables: ProfileListPageVariablesI;
  scrollDispatch: React.Dispatch<ScrollActionType>;
  query: string;
  queryName: string;
  pageName?: string;
  children?: React.ReactNode;
}

export const ProfileListPage: React.FC<Props> = ({
  variables,
  scrollDispatch,
  query,
  queryName,
  pageName,
  children,
}) => {
  const { viewer } = useGlobalContext() as globalContextType;
  const [resultProfiles] = useQuery({ query, variables });
  const { data, fetching } = resultProfiles;
  const profilePage = data
    ? pageName
      ? data[queryName][pageName]
      : data[queryName]
    : undefined;
  const isViewersFollowers =
    variables.username === viewer.data.viewer.username &&
    queryName === "followers";

  useEffect(() => {
    if (!data) return;

    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    if (profilePage.isNextPage === false) scrollDispatch({ type: "last-page" });
  }, [data]);

  if (fetching || !data)
    return (
      <>
        {variables.skip === 0 ? (
          <ProfileListLinksPlaceholder listLength={8} />
        ) : (
          <div style={{ padding: "32px" }}>
            <Spinner size="large" />
          </div>
        )}
      </>
    );

  if (profilePage.profiles?.length === 0 || profilePage.reactions?.length === 0)
    return <>{children}</>;

  if (variables.messageId)
    return (
      <>
        {(profilePage.reactions as messageLikeType[]).map((reaction) => {
          return <MessageLikeItem key={reaction.user.id} like={reaction} />;
        })}
      </>
    );

  return (
    <ProfileListLinks
      profiles={profilePage.profiles}
      isViewersFollowers={isViewersFollowers}
    />
  );
};
