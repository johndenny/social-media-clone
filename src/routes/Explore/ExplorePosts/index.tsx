import React from "react";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { PhotoGridPage } from "../../../components/PhotoGrid/PhotoGridPage";
import { ExplorePosts as ExplorePostsQuery } from "../../../graphQL/queries";
import { PageContainer } from "../../Profile/styled";
import { Container } from "./styled";
import { FeaturedHashTags } from "./FeaturedHashTags";

interface Props {}

export const ExplorePosts: React.FC<Props> = () => {
  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 12,
  });

  return (
    <Container>
      <FeaturedHashTags />
      <PageContainer ref={scrollRef}>
        {scrollState.moreVars.map((vars, index) => {
          return (
            <PhotoGridPage
              key={"explore" + index + vars.skip}
              variables={vars}
              scrollDispatch={scrollDispatch}
              query={ExplorePostsQuery}
              queryName={"explorePosts"}
            />
          );
        })}
      </PageContainer>
    </Container>
  );
};
