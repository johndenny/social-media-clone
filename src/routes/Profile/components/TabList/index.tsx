import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UseQueryState } from "urql";
import { ReactComponent as PostsSvg } from "../../../../assets/svgs/posts.svg";
import { ReactComponent as SavedSvg } from "../../../../assets/svgs/unsaved.svg";
import { ReactComponent as TaggedSvg } from "../../../../assets/svgs/tagged.svg";
import { ReactComponent as PostFeedSvg } from "../../../../assets/svgs/postFeed.svg";
import {
  Container,
  FeedSprite,
  Span,
  StyledLink,
  StyledPreload,
} from "./styled";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";

interface Props {
  username: string;
  isViewingOwnProfile: boolean;
  width: number;
  resultUserFeedQuery: UseQueryState<any, any>;
  resultTaggedPosts: UseQueryState<any, any>;
}

export const TabList = React.memo(function TabList({
  username,
  isViewingOwnProfile,
  width,
  resultUserFeedQuery,
  resultTaggedPosts,
}: Props) {
  const { user, viewer, resultSavedPosts, resultCollections } =
    useGlobalContext() as globalContextType;
  const params = useParams();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("");
  const isCollection = viewer.data?.viewer.isCollection;

  useEffect(() => {
    const pathnameArray = location.pathname
      .split("/")
      .filter((value) => value !== "");
    setSelectedTab(() => {
      switch (true) {
        case pathnameArray.length === 1:
          return "posts";
        case pathnameArray[1] === "feed":
          return "feed";
        case pathnameArray[1] === "saved":
          return "saved";
        case pathnameArray[1] === "tagged":
          return "tagged";
        default:
          return "";
      }
    });
  }, [location]);

  return (
    <Container>
      <StyledPreload
        to={`/${username}/`}
        query={PreloadQuery.user}
        queryResult={user}
        variables={{ username: params.username, limit: 12, skip: 0 }}
        selected={selectedTab === "posts"}
      >
        {width > 735 ? (
          <Span>
            <PostsSvg
              width="12px"
              height="12px"
              stroke={selectedTab === "posts" ? "#262626" : "#8e8e8e"}
            />
            <span>Posts</span>
          </Span>
        ) : (
          <PostsSvg
            width="24px"
            height="24px"
            stroke={selectedTab === "posts" ? "#0095f6" : "#8e8e8e"}
          />
        )}
      </StyledPreload>
      {width < 735 && (
        <StyledPreload
          to={`/${username}/feed/`}
          query={PreloadQuery.userFeed}
          queryResult={resultUserFeedQuery}
          variables={{ username: params.username, limit: 16, skip: 0 }}
          selected={selectedTab === "feed"}
        >
          <PostFeedSvg
            width="24px"
            height="24px"
            stroke={selectedTab === "feed" ? "#0095f6" : "#8e8e8e"}
          />
        </StyledPreload>
      )}
      {isViewingOwnProfile && (
        <StyledPreload
          to={`/${username}/saved/`}
          query={
            isCollection ? PreloadQuery.collections : PreloadQuery.savedPosts
          }
          queryResult={isCollection ? resultCollections : resultSavedPosts}
          variables={{ limit: 12, skip: 0 }}
          selected={selectedTab === "saved"}
        >
          {width > 735 ? (
            <Span>
              <SavedSvg
                width="12px"
                height="12px"
                stroke={selectedTab === "saved" ? "#262626" : "#8e8e8e"}
              />
              <span>Saved</span>
            </Span>
          ) : (
            <SavedSvg
              width="24px"
              height="24px"
              stroke={selectedTab === "saved" ? "#0095f6" : "#8e8e8e"}
            />
          )}
        </StyledPreload>
      )}
      <StyledPreload
        to={`/${username}/tagged/`}
        query={PreloadQuery.taggedPosts}
        queryResult={resultTaggedPosts}
        variables={{ username: params.username, limit: 12, skip: 0 }}
        selected={selectedTab === "tagged"}
      >
        {width > 735 ? (
          <Span>
            <TaggedSvg
              width="12px"
              height="12px"
              stroke={selectedTab === "tagged" ? "#262626" : "#8e8e8e"}
            />
            <span>Tagged</span>
          </Span>
        ) : (
          <TaggedSvg
            width="24px"
            height="24px"
            stroke={selectedTab === "tagged" ? "#0095f6" : "#8e8e8e"}
          />
        )}
      </StyledPreload>
    </Container>
  );
});
