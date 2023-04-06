import React, { useEffect } from "react";
import { useQuery } from "urql";
import { Spinner } from "../../../../components/Spinner";
import { ViewerFollowRequests } from "../../../../graphQL/queries";
import {
  PageVariablesI,
  ScrollActionType,
} from "../../../../hooks/useInfinitePagination";
import { UserNamesI } from "../../../../types";
import { FollowRequestItem } from "../componenets/FollowRequestItem";

interface Props {
  variables: PageVariablesI;
  scrollDispatch: React.Dispatch<ScrollActionType>;
}

export const FollowRequestsPage: React.FC<Props> = ({
  variables,
  scrollDispatch,
}) => {
  const [resultFollowRequest] = useQuery({
    query: ViewerFollowRequests,
    variables,
  });
  const { data, fetching } = resultFollowRequest;

  useEffect(() => {
    if (!data) return;

    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    if (data.followRequests.isNextPage === false)
      scrollDispatch({ type: "last-page" });
  }, [data]);

  if (fetching || !data)
    return (
      <div style={{ padding: "32px" }}>
        <Spinner size="large" />
      </div>
    );

  return (
    <div>
      {data.followRequests.profiles.map((profile: UserNamesI) => (
        <FollowRequestItem key={profile.id} user={profile} />
      ))}
    </div>
  );
};
