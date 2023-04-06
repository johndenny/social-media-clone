import React, { useEffect, useLayoutEffect } from "react";
import { Login } from "../Accounts/Login";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { LoginGallery } from "./LoginGallery";
import { Article, Container, WideContainer } from "./styled";
import { LoginArticle } from "../Accounts/styled";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../components/HeaderMobile";
import { FollowingPosts } from "./FollowingPosts";

export type PostVars = {
  date: string;
  limit: number;
  skip: number;
};

interface Props {}

export const Home: React.FC<Props> = () => {
  const { viewer, isMobile, setHeaderAttrs } =
    useGlobalContext() as globalContextType;

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  useLayoutEffect(() => {
    if (viewer.data && isMobile) {
      setHeaderAttrs({
        title: "logo",
        leftButton: LeftHeaderButton.newStory,
        rightButton: RightHeaderButton.messenger,
      });
    }
  }, [isMobile, viewer.data]);

  if (!viewer.data) {
    if (isMobile) {
      return (
        <Article>
          <LoginArticle>
            <Login />
          </LoginArticle>
        </Article>
      );
    }
    return (
      <Article>
        <LoginGallery />
        <Container isMobile={isMobile}>
          <LoginArticle>
            <Login />
          </LoginArticle>
        </Container>
      </Article>
    );
  }
  if (!isMobile)
    return (
      <WideContainer>
        <FollowingPosts />
      </WideContainer>
    );
  return <FollowingPosts />;
};
