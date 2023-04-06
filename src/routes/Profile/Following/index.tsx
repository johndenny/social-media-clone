import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProfileListLinks } from "../../../components/ProfileListLinks";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { ProfileListPage } from "../../../components/ProfileListLinks/ProfileListPage";
import { Following as FollowingQuery } from "../../../graphQL/queries";
import { ProfileListLinksPlaceholder } from "../../../components/ProfileListLinks/ProfileListLinksPlaceholder";
import { FollowingPlaceholder } from "./FollowingPlaceholder";
import { Container } from "./styled";
import { LocationState } from "../../../App";

interface Props {}

export const Following: React.FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { isMobile, setHeaderAttrs, resultFollowing, queryVarsDispatch } =
    useGlobalContext() as globalContextType;
  const { data } = resultFollowing;
  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 16,
    type: !isMobile ? "modal" : undefined,
  });
  const followingPage = data?.following;

  useLayoutEffect(() => {
    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Following",
    });
  }, []);

  useEffect(() => {
    if (!isMobile && !(location.state as LocationState)?.background)
      navigate("", { state: { background: `/${params.username}` } });
  }, []);

  return (
    <Container ref={scrollRef}>
      {scrollState.moreVars.map((vars, index) => {
        return (
          <ProfileListPage
            key={index + vars.skip + "following"}
            variables={{ ...vars, username: params.username }}
            scrollDispatch={scrollDispatch}
            query={FollowingQuery}
            queryName={"following"}
          >
            <FollowingPlaceholder />
          </ProfileListPage>
        );
      })}
    </Container>
  );
};
