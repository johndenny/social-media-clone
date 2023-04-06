import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "..";
import { PostsPage } from "../../../components/PostsPage";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import { UniqueUserFeed } from "../../../graphQL/queries";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { PhotosPlaceholder } from "../components/PhotosPlaceholder";

interface Props {}

export const ProfileFeed: React.FC<Props> = () => {
  const params = useParams();
  const { queryVarsDispatch } = useGlobalContext() as globalContextType;
  const { isViewingOwnProfile, postsFeed } = useProfile();

  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 12,
  });

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.userFeed,
        variables: { username: params.username, limit: 12, skip: 0 },
      },
    });
  }, []);

  if (!postsFeed) return <></>;

  if (postsFeed.posts.length !== 0)
    return (
      <div ref={scrollRef}>
        {scrollState.moreVars.map((vars, index) => {
          return (
            <PostsPage
              key={index + vars.skip}
              variables={{ ...vars, username: params.username }}
              query={UniqueUserFeed}
              queryName="user"
              queryPage="postsPage"
              scrollDispatch={scrollDispatch}
            />
          );
        })}
      </div>
    );

  return <PhotosPlaceholder isViewingOwnProfile={isViewingOwnProfile} />;
};
