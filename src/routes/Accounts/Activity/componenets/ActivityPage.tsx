import React, { useEffect } from "react";
import { useQuery } from "urql";
import { Spinner } from "../../../../components/Spinner";
import { ViewerActivty } from "../../../../graphQL/queries";
import {
  PageVariablesI,
  ScrollActionType,
} from "../../../../hooks/useInfinitePagination";
import { ActivityItem, ActivityItemType } from "./ActivityItem";

export interface ActivityPageVariablesI extends PageVariablesI {
  date: string;
}

interface Props {
  variables: ActivityPageVariablesI;
  scrollDispatch: React.Dispatch<ScrollActionType>;
  titlesRef: React.MutableRefObject<string[]>;
}

export const ActivityPage: React.FC<Props> = ({
  variables,
  scrollDispatch,
  titlesRef,
}) => {
  const [resultActivity] = useQuery({ query: ViewerActivty, variables });
  const { data, fetching } = resultActivity;

  useEffect(() => {
    if (!data) return;

    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    if (data.activityPage.isNextPage === false)
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
      {data.activityPage.activity.map((activityItem: ActivityItemType) => (
        <ActivityItem
          key={activityItem.id}
          activityItem={activityItem}
          titlesRef={titlesRef}
          resultActivity={resultActivity}
        />
      ))}
    </div>
  );
};
