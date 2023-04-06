import React, { useLayoutEffect } from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { Container, Header } from "./styled";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { ProfileListPage } from "../../../components/ProfileListLinks/ProfileListPage";
import { SuggestedUsers } from "../../../graphQL/queries";

interface Props {}

export const People: React.FC<Props> = () => {
  const { setHeaderAttrs, isMobile } = useGlobalContext() as globalContextType;

  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 16,
  });

  useLayoutEffect(() => {
    document.title = "Instagram • Discover people";

    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Discover People",
    });
  }, []);

  return (
    <Container ref={scrollRef}>
      <Header>Suggested</Header>
      {scrollState.moreVars.map((vars, index) => {
        return (
          <ProfileListPage
            key={index + vars.skip + "suggestedUsers"}
            variables={vars}
            scrollDispatch={scrollDispatch}
            query={SuggestedUsers}
            queryName={"suggestedUsers"}
          />
        );
      })}
    </Container>
  );
};
