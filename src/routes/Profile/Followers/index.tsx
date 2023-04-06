import React, { useEffect, useLayoutEffect } from "react";
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
import { Followers as FollowersQuery } from "../../../graphQL/queries";
import { LocationState } from "../../../App";
import { FollowersPlaceholder } from "./FollowersPlaceholder";
import { ProfileListLinksPlaceholder } from "../../../components/ProfileListLinks/ProfileListLinksPlaceholder";
import { Container } from "../Following/styled";

const LIMIT = 16;

interface Props {}

export const Followers: React.FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { isMobile, setHeaderAttrs } = useGlobalContext() as globalContextType;

  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 16,
  });

  useLayoutEffect(() => {
    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Followers",
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
            key={index + vars.skip + "followers"}
            variables={{ ...vars, username: params.username }}
            scrollDispatch={scrollDispatch}
            query={FollowersQuery}
            queryName={"followers"}
          >
            <FollowersPlaceholder />
          </ProfileListPage>
        );
      })}
    </Container>
  );
};
