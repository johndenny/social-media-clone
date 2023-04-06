import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "..";
import { Tags } from "../../../graphQL/queries";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { PhotoGridPage } from "../../../components/PhotoGrid/PhotoGridPage";
import { PlaceHolder } from "./components/Placeholder";

interface Props {}

export const Tagged: React.FC<Props> = () => {
  const params = useParams();
  const { isViewingOwnProfile, resultTaggedPosts } = useProfile();
  const { data } = resultTaggedPosts;
  const taggedPosts = data?.tags.posts;
  const { scrollRef, scrollDispatch, scrollState } = useInfinitePagination({
    limit: 12,
  });

  console.log(taggedPosts);

  if (taggedPosts?.length !== 0)
    return (
      <div ref={scrollRef}>
        {scrollState.moreVars.map((vars, index) => {
          return (
            <PhotoGridPage
              key={index + vars.skip}
              query={Tags}
              queryName={"tags"}
              variables={{ ...vars, username: params.username }}
              scrollDispatch={scrollDispatch}
            />
          );
        })}
      </div>
    );

  return <PlaceHolder isViewingOwnProfile={isViewingOwnProfile} />;
};
