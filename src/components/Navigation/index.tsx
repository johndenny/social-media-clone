import React, { useLayoutEffect, useState } from "react";
import {
  Container,
  InnerContainer,
  LinksContainer,
  LogoContainer,
  SignUpButton,
  Spacer,
} from "./styled";
import { ReactComponent as Logo } from "../../assets/svgs/instagram.svg";
import { NavigationSearch } from "./components/NavigationSearch";
import { ReactComponent as HomeSvg } from "../../assets/svgs/home.svg";
import { ReactComponent as HomeSelectedSvg } from "../../assets/svgs/homeSelected.svg";
import { ReactComponent as MessageSvg } from "../../assets/svgs/messenger.svg";
import { ReactComponent as MessageSelectedSvg } from "../../assets/svgs/messengerSelected.svg";
import { ReactComponent as NewPostSvg } from "../../assets/svgs/newPost.svg";
import { ReactComponent as NewPostSelectedSvg } from "../../assets/svgs/newPostSelected.svg";
import { ReactComponent as ExploreSvg } from "../../assets/svgs/explore.svg";
import { ReactComponent as ExploreSelectedSvg } from "../../assets/svgs/exploreSelected.svg";
import { useLocation } from "react-router-dom";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { StyledPreloadLink } from "../FooterMobile/styled";
import { NavigationActivty } from "./components/NavigationActivity";
import { NavigationProfile } from "./components/NavigationProfile";
import { MessageCountContainer } from "../HeaderMobile/styled";
import useWindowSize from "../../hooks/useWindowSize";
import { Button } from "../../styled";
import { PaddedButton } from "../PaddedButton";

interface Props {}

export const Navigation: React.FC<Props> = () => {
  const location = useLocation();
  const { width } = useWindowSize();
  const {
    resultFollowingPosts,
    resultExplorePosts,
    followingPostsDate,
    viewer,
    resultViewerChats,
    isCreatePostOpen,
    setIsCreatePostOpen,
    messagesDate,
    setModalAttrs,
  } = useGlobalContext() as globalContextType;
  const isLoggedIn = Boolean(viewer.data);

  const [selectedIcon, setSelectedIcon] = useState("");
  const [isDropDown, setIsDropDown] = useState(false);

  useLayoutEffect(() => {
    const pathnameArray = location.pathname
      .split("/")
      .filter((value) => value !== "");
    setSelectedIcon(() => {
      switch (true) {
        case pathnameArray.length === 0:
          return "home";
        case pathnameArray[0] === "explore":
          return "explore";
        case pathnameArray[0] === viewer.data?.viewer.username:
          return "profile";
        case pathnameArray[0] === "direct":
          return "inbox";
        default:
          return "";
      }
    });
  }, [location]);

  return (
    <nav>
      <Spacer></Spacer>
      <Container>
        <InnerContainer>
          <LogoContainer>
            <StyledPreloadLink
              to="/"
              query={PreloadQuery.followingPosts}
              queryResult={resultFollowingPosts}
              variables={{
                limit: 12,
                skip: 0,
                date: followingPostsDate,
              }}
            >
              <Logo />
            </StyledPreloadLink>
          </LogoContainer>
          {width > 735 && <NavigationSearch />}
          {isLoggedIn ? (
            <LinksContainer>
              <StyledPreloadLink
                to="/"
                query={PreloadQuery.followingPosts}
                queryResult={resultFollowingPosts}
                variables={{
                  limit: 12,
                  skip: 0,
                  date: followingPostsDate,
                }}
              >
                {selectedIcon === "home" && !isDropDown && !isCreatePostOpen ? (
                  <HomeSelectedSvg />
                ) : (
                  <HomeSvg />
                )}
              </StyledPreloadLink>
              <StyledPreloadLink
                to="/direct/inbox/"
                query={PreloadQuery.viewerChats}
                queryResult={resultViewerChats}
                variables={{ limit: 16, skip: 0, date: messagesDate }}
              >
                {viewer.data?.viewer.unreadCount !== 0 && (
                  <MessageCountContainer>
                    {viewer.data?.viewer.unreadCount}
                  </MessageCountContainer>
                )}

                {selectedIcon === "inbox" &&
                !isDropDown &&
                !isCreatePostOpen ? (
                  <MessageSelectedSvg />
                ) : (
                  <MessageSvg />
                )}
              </StyledPreloadLink>
              <Button onClick={() => setIsCreatePostOpen(true)}>
                {isCreatePostOpen ? <NewPostSelectedSvg /> : <NewPostSvg />}
              </Button>

              <StyledPreloadLink
                to="/explore/"
                query={PreloadQuery.explorePosts}
                queryResult={resultExplorePosts}
                variables={{ limit: 12, skip: 0 }}
              >
                {selectedIcon === "explore" &&
                !isDropDown &&
                !isCreatePostOpen ? (
                  <ExploreSelectedSvg />
                ) : (
                  <ExploreSvg />
                )}
              </StyledPreloadLink>

              <NavigationActivty setIsDropDown={setIsDropDown} />

              <NavigationProfile
                selectedIcon={selectedIcon}
                setIsDropDown={setIsDropDown}
              />
            </LinksContainer>
          ) : (
            <LinksContainer>
              <PaddedButton onClick={() => setModalAttrs({ type: "log-in" })}>
                Log In
              </PaddedButton>
              <SignUpButton>Sign Up</SignUpButton>
            </LinksContainer>
          )}
        </InnerContainer>
      </Container>
    </nav>
  );
};
