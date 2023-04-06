import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "../../../components/Spinner";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import {
  ActivityPage,
  ActivityPageVariablesI,
} from "./componenets/ActivityPage";
import { FollowRequestButton } from "./componenets/FollowRequestButton";
import { FollowRequests } from "./FollowRequests";
import { Container } from "./styled";

interface Props {}

export const Activity: React.FC<Props> = () => {
  const {
    isMobile,
    setHeaderAttrs,
    queryVarsDispatch,
    resultActivity,
    activityDate,
  } = useGlobalContext() as globalContextType;
  const { data, fetching } = resultActivity;
  const activityPage = data?.activityPage;

  const titlesRef = useRef<string[]>([]);
  const [isFollowRequest, setIsFollowRequest] = useState(false);
  const isOldData =
    (resultActivity.operation?.variables as ActivityPageVariablesI | undefined)
      ?.date !== activityDate;

  const { scrollDispatch, scrollRef, viewportRef, scrollState } =
    useInfinitePagination({
      limit: 16,
      type: isMobile ? undefined : "modal",
    });

  useLayoutEffect(() => {
    if (isMobile) setHeaderAttrs({ title: "Activity" });
  }, []);

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.activity,
        variables: { limit: 16, skip: 0, date: activityDate },
      },
    });
  }, [isOldData]);

  if (isFollowRequest) return <FollowRequests />;

  return (
    <div style={{ flex: 1, minHeight: 0 }} ref={viewportRef}>
      <Container ref={scrollRef}>
        {fetching || !data ? (
          <div style={{ padding: "32px" }}>
            <Spinner size="large" />
          </div>
        ) : (
          <>
            {activityPage?.followRequests.length !== 0 && (
              <FollowRequestButton
                onClick={() => setIsFollowRequest(true)}
                users={activityPage?.followRequests}
                count={activityPage?.activityCounts.totalFollowRequests}
              />
            )}
            {scrollState.moreVars.map((vars, index) => {
              return (
                <ActivityPage
                  key={vars.skip + index}
                  variables={{ ...vars, date: activityDate }}
                  scrollDispatch={scrollDispatch}
                  titlesRef={titlesRef}
                />
              );
            })}
          </>
        )}
      </Container>
    </div>
  );
};
