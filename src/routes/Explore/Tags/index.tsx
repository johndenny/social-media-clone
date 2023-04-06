import React, { useEffect, useLayoutEffect } from "react";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { PhotoGrid } from "../../../components/PhotoGrid";
import { Img } from "../../../components/ProfilePhoto/styled/Img";
import { Span } from "../../../components/ProfilePhoto/styled/Span";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import useWindowSize from "../../../hooks/useWindowSize";
import { cld } from "../../../utils/cloudinaryConfig";
import { Container, Count, Header } from "./styled";
import { HeaderSecondary } from "./styled/HeaderSecondary";
import { ReactComponent as SplashScreen } from "../../../assets/svgs/splashScreen.svg";
import { useParams } from "react-router-dom";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { PageContainer } from "../../Profile/styled";
import { PhotoGridPage } from "../../../components/PhotoGrid/PhotoGridPage";
import { HashTag } from "../../../graphQL/queries";

interface Props {}

export const Tags: React.FC<Props> = () => {
  const params = useParams();
  const { width } = useWindowSize();
  const { isMobile, setHeaderAttrs, resultHashTag, queryVarsDispatch } =
    useGlobalContext() as globalContextType;
  const { data } = resultHashTag;
  const { scrollDispatch, scrollState, scrollRef } = useInfinitePagination({
    limit: 12,
  });

  useLayoutEffect(() => {
    if (!data) return;

    document.title = `#${data.hashTag.name} • Instagram`;

    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: `#${data.hashTag.name}`,
    });
  }, [data]);

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.hashTag,
        variables: {
          name: params.name,
          limit: 12,
          skip: 0,
        },
      },
    });
  }, []);

  if (!data) return <SplashScreen />;

  return (
    <Container>
      <Header>
        <Span height={width > 735 ? "152px" : "77px"}>
          <Img
            alt=""
            src={cld
              .image(data.hashTag.pagedPosts.posts[0].photos[0].id)
              .toURL()}
          />
        </Span>
        <span>
          <Count>{`${data.hashTag.postCount} `}</Count>
          {data.hashTag.postCount === 1 ? "post" : "posts"}
        </span>
      </Header>
      <HeaderSecondary>Most Recent</HeaderSecondary>
      <PageContainer ref={scrollRef}>
        {scrollState.moreVars.map((vars, index) => {
          return (
            <PhotoGridPage
              key={index + vars.skip}
              variables={{ ...vars, name: params.name }}
              scrollDispatch={scrollDispatch}
              query={HashTag}
              queryName={"hashTag"}
              pageName={"pagedPosts"}
            />
          );
        })}
      </PageContainer>
    </Container>
  );
};
