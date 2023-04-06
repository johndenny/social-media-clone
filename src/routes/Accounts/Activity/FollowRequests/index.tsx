import React, { useLayoutEffect } from "react";
import { LeftHeaderButton } from "../../../../components/HeaderMobile";
import { globalContextType } from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { useInfinitePagination } from "../../../../hooks/useInfinitePagination";
import { Container } from "../styled";
import { FollowRequestsPage } from "./FollowRequestsPage";

interface Props {}

export const FollowRequests: React.FC<Props> = () => {
  const { isMobile, setHeaderAttrs } = useGlobalContext() as globalContextType;

  const { scrollDispatch, scrollRef, viewportRef, scrollState } =
    useInfinitePagination({
      limit: 16,
      type: isMobile ? undefined : "modal",
    });

  useLayoutEffect(() => {
    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Follow Requests",
    });
  }, []);

  console.log(scrollState);

  return (
    <div style={{ flex: 1 }} ref={viewportRef}>
      <Container ref={scrollRef}>
        {scrollState.moreVars.map((vars, index) => {
          return (
            <FollowRequestsPage
              key={vars.skip + index}
              variables={vars}
              scrollDispatch={scrollDispatch}
            />
          );
        })}
      </Container>
    </div>
  );
};
