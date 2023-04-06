import React from "react";
import { useParams } from "react-router-dom";
import { UniqueUserPostsGrid } from "../../../graphQL/queries";
import { PhotosPlaceholder } from "../components/PhotosPlaceholder";
import { PhotoGridPage } from "../../../components/PhotoGrid/PhotoGridPage";
import { PageContainer } from "../styled";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { globalContextType } from "../../../context/GlobalContext";
import { useProfile } from "..";

interface Props {
  username?: string;
}

export const ProfileRoot: React.FC<Props> = ({ username }) => {
  const params = useParams();
  const { user } = useGlobalContext() as globalContextType;
  const profileContext = useProfile();
  const posts = user.data?.user.postsPage.posts;

  const { scrollRef, viewportRef, scrollDispatch, scrollState } =
    useInfinitePagination({
      limit: 12,
    });

  return (
    <div style={{ flex: 1 }} ref={viewportRef}>
      {profileContext && posts.length === 0 && (
        <PhotosPlaceholder
          isViewingOwnProfile={profileContext.isViewingOwnProfile}
        />
      )}
      <PageContainer ref={scrollRef}>
        {scrollState.moreVars.map((vars, index) => {
          return (
            <PhotoGridPage
              key={index + vars.skip}
              query={UniqueUserPostsGrid}
              queryName="user"
              pageName="postsPage"
              variables={{ ...vars, username: params.username || username }}
              scrollDispatch={scrollDispatch}
            />
          );
        })}
      </PageContainer>
    </div>
  );
};
