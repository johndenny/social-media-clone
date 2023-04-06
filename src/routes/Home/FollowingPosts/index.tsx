import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import {
  NewPostButtonContainer,
  NewPostsButton,
  PostContainer,
} from "../styled";
import { PostsPage } from "../../../components/PostsPage";
import { PostPlaceholder } from "../../../components/PostItem/PostPlaceholder";
import { Container, SpinnerContainer } from "./styled";
import { FollowingPosts as FollowingPostsQuery } from "../../../graphQL/queries";
import { Spinner } from "../../../components/Spinner";
import { People } from "../../Explore/People";
import useWindowSize from "../../../hooks/useWindowSize";
import { SideBar } from "../SideBar";

const LIMIT = 12;

interface Props {}

export const FollowingPosts: React.FC<Props> = () => {
  const { width } = useWindowSize();
  const {
    scrollY,
    setScrollY,
    followingPostsInfinitePagination,
    followingPostsDate,
    setFollowingPostsDate,
    isNewPosts,
    setIsNewPosts,
    isMobile,
    queryVarsDispatch,
    resultFollowingPosts,
  } = useGlobalContext() as globalContextType;

  const [isSlideUp, setIsSlideUp] = useState(false);

  const { scrollDispatch, scrollRef, scrollState } =
    followingPostsInfinitePagination;
  const isFetching =
    scrollState.isFetching && scrollState.moreVars.length === 1;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (scrollState.moreVars.length === 0) return;
    console.log("scrollTO");
    if (scrollY) window.scrollTo(0, scrollY);
  }, []);

  const newPostsHandler = () => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
    const currentDate = new Date().toISOString();
    setFollowingPostsDate(currentDate);
    setIsNewPosts(false);
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.followingPosts,
        variables: {
          limit: LIMIT,
          skip: 0,
          date: currentDate,
        },
      },
    });
  };

  const buttonAnimationHandler = () => {
    if (!isSlideUp) return;

    setIsSlideUp(false);
    newPostsHandler();
  };

  if (resultFollowingPosts.data?.followingPosts.posts.length === 0)
    return <People />;

  return (
    <>
      <Container isMobile={isMobile}>
        {isFetching && (
          <SpinnerContainer>
            <Spinner size="large" />
          </SpinnerContainer>
        )}

        <PostContainer
          isMobile={isMobile}
          ref={scrollRef}
          isFetching={isFetching}
        >
          {isFetching && (
            <>
              <PostPlaceholder />
              <PostPlaceholder />
            </>
          )}
          <>
            {isNewPosts && (
              <NewPostButtonContainer>
                <NewPostsButton
                  isSlideUp={isSlideUp}
                  onClick={() => setIsSlideUp(true)}
                  onAnimationEnd={buttonAnimationHandler}
                >
                  New posts
                </NewPostsButton>
              </NewPostButtonContainer>
            )}

            {scrollState.moreVars.map((vars, index) => {
              return (
                <PostsPage
                  key={index + vars.skip}
                  variables={{ ...vars, date: followingPostsDate }}
                  query={FollowingPostsQuery}
                  queryName="followingPosts"
                  scrollDispatch={scrollDispatch}
                />
              );
            })}
          </>
        </PostContainer>
      </Container>
      {width > 999 && <SideBar />}
    </>
  );
};
