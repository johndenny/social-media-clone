import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { PageNotFound } from "../../components/PageNotFound";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { ReactComponent as SplashScreenSvg } from "../../assets/svgs/splashScreen.svg";
import { Container, MediaContainer, PrivatePlaceholder } from "./styled";
import { Header } from "./components/Header";
import { Counts } from "./components/Counts";
import { TabList } from "./components/TabList";
import useWindowSize from "../../hooks/useWindowSize";
import { ProfileText } from "./components/ProfileText";
import { HeaderWideScreen } from "./components/HeaderWideScreen";
import { GridPostType } from "../../components/PhotoGrid";
import { useMutation, useQuery, UseQueryState } from "urql";
import { PostValues } from "../../components/PostItem";
import { Tags, UniqueUserFeed } from "../../graphQL/queries";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../components/HeaderMobile";
import { SuggestedUserGallery } from "../Home/SuggestedUserGallery";
import { Navigation } from "../../components/Navigation";
import { MutualFollowers } from "./components/MutualFollowers";
import { NewChat } from "../../graphQL/mutations";

interface ProfileContext {
  isViewingOwnProfile: boolean;
  postsGrid: { id: string; posts: GridPostType[]; isNextPage: boolean };
  postsFeed: { id: string; posts: PostValues[]; isNextPage: boolean };
  resultUserFeedQuery: UseQueryState<any, string>;
  resultTaggedPosts: UseQueryState<any, string>;
}

export const Profile: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const {
    setModalAttrs,
    setHeaderAttrs,
    viewer,
    user,
    isMobile,
    queryVarsState,
    queryVarsDispatch,
    setFooterMessage,
  } = useGlobalContext() as globalContextType;
  const [resultUserFeedQuery] = useQuery({
    query: UniqueUserFeed,
    variables: queryVarsState.userFeed,
    pause: !queryVarsState.userFeed,
  });
  const [resultTaggedPosts] = useQuery({
    query: Tags,
    variables: queryVarsState.taggedPosts,
    pause: !queryVarsState.taggedPosts,
  });
  const [newChatResult, newChatMutation] = useMutation(NewChat);

  const [isSuggestionVisible, setIsSuggestionsVisible] = useState(false);

  const isViewingOwnProfile =
    viewer.data?.viewer.username === user.data?.user.username;
  const isPrivate =
    user.data?.user.isPrivate &&
    !user.data?.user.isFollowing &&
    !isViewingOwnProfile;
  const isLoggedIn = Boolean(viewer.data);

  useLayoutEffect(() => {
    if (!user.data) return;
    const { username, fullName } = user.data.user;

    if (!fullName) {
      document.title = `@${username} • Instagram photos and videos`;
    } else {
      document.title = `${fullName} (@${username}) • Instagram photos and videos`;
    }
    if (!isMobile) return;
    if (!isLoggedIn) return setHeaderAttrs({ title: "logged-out" });
    isViewingOwnProfile
      ? setHeaderAttrs({
          leftButton: LeftHeaderButton.options,
          leftOnClick: () => setModalAttrs({ type: "viewer-profile-options" }),
          title: username,
          rightButton: RightHeaderButton.discoverPeople,
        })
      : setHeaderAttrs({
          leftButton: LeftHeaderButton.backChevron,
          title: username,
        });
  }, [user, isMobile, viewer, location]);

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.user,
        variables: { username: params.username, limit: 12, skip: 0 },
      },
    });
  }, [location]);

  const messageHandler = () => {
    if (!isLoggedIn) return setModalAttrs({ type: "log-in" });

    newChatMutation({ members: [user.data?.user.id] }).then((result) => {
      if (result.error) setFooterMessage("New message failed.");
      if (result.data) setModalAttrs(null);
      navigate(`/direct/t/${result.data.newChat.id}/`);
    });
  };

  if (user.error) return <PageNotFound />;

  if (
    (user.fetching && !queryVarsState.isPreload) ||
    user.data?.user.username !== params.username
  )
    return <SplashScreenSvg />;

  return (
    <>
      {!isMobile && !isLoggedIn && <Navigation />}
      <Container>
        {width > 735 ? (
          <>
            <HeaderWideScreen
              isMobile={isMobile}
              isViewingOwnProfile={isViewingOwnProfile}
              user={user.data?.user}
              isSuggestionsVisible={isSuggestionVisible}
              setIsSuggestionsVisible={setIsSuggestionsVisible}
              messageFetching={newChatResult.fetching}
              messageHandler={messageHandler}
            />
            {isSuggestionVisible && (
              <div style={{ marginBottom: "28px" }}>
                <SuggestedUserGallery />
              </div>
            )}
          </>
        ) : (
          <>
            <Header
              isViewingOwnProfile={isViewingOwnProfile}
              user={user?.data?.user}
              isSuggestionsVisible={isSuggestionVisible}
              setIsSuggestionsVisible={setIsSuggestionsVisible}
              messageFetching={newChatResult.fetching}
              messageHandler={messageHandler}
            />
            {isSuggestionVisible && (
              <div
                style={{
                  paddingBottom: "28px",
                  backgroundColor: "rgb(var(--primary-background))",
                }}
              >
                <SuggestedUserGallery />
              </div>
            )}
            <ProfileText
              fullName={user?.data?.user?.fullName}
              bio={user?.data?.user?.bio}
              url={user?.data?.user?.url}
            />
            {!isViewingOwnProfile &&
              user.data?.user.mutualFollowers &&
              user.data?.user.mutualFollowers.users.length !== 0 && (
                <span style={{ padding: "0 0 16px 16px" }}>
                  <MutualFollowers
                    mutualFollowers={user.data?.user.mutualFollowers}
                  />
                </span>
              )}
            <Counts
              isViewingOwnProfile={isViewingOwnProfile}
              counts={user.data?.user.counts}
              username={user.data?.user.username}
              isPrivate={isPrivate}
            />
          </>
        )}

        {isPrivate ? (
          <PrivatePlaceholder>
            <span>This Account is Private</span>
            <span>Follow to see their photos.</span>
          </PrivatePlaceholder>
        ) : (
          <>
            <TabList
              resultTaggedPosts={resultTaggedPosts}
              resultUserFeedQuery={resultUserFeedQuery}
              width={width}
              username={user?.data?.user?.username}
              isViewingOwnProfile={isViewingOwnProfile}
            />

            <MediaContainer>
              <Outlet
                context={{
                  isViewingOwnProfile,
                  postsGrid: user?.data?.user.postsPage,
                  postsFeed: resultUserFeedQuery?.data?.user.postsPage,
                  resultUserFeedQuery: resultUserFeedQuery,
                  resultTaggedPosts: resultTaggedPosts,
                }}
              />
            </MediaContainer>
          </>
        )}
      </Container>
    </>
  );
};

export function useProfile() {
  return useOutletContext<ProfileContext>();
}
