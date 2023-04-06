import React, { useLayoutEffect } from "react";
import { useQuery } from "urql";
import {
  PageVariablesI,
  ScrollActionType,
} from "../../hooks/useInfinitePagination";
import { SuggestedUserGallery } from "../../routes/Home/SuggestedUserGallery";
import { PostItem, PostValues } from "../PostItem";
import { Spinner } from "../Spinner";

interface PostsPageVariablesI extends PageVariablesI {
  date?: string;
  username?: string;
}

interface Props {
  variables: PostsPageVariablesI;
  scrollDispatch: React.Dispatch<ScrollActionType>;
  query: string;
  queryName: string;
  queryPage?: string;
}

export const PostsPage: React.FC<Props> = ({
  variables,
  query,
  queryName,
  queryPage,
  scrollDispatch,
}) => {
  const [resultPosts] = useQuery({ query, variables });

  useLayoutEffect(() => {
    if (!resultPosts.data) return;

    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    let nextPage = resultPosts.data[queryName].isNextPage;
    if (queryPage) nextPage = resultPosts.data[queryName][queryPage].isNextPage;
    if (nextPage === false) scrollDispatch({ type: "last-page" });
  }, [resultPosts.data]);

  if (resultPosts.fetching)
    return (
      <div style={{ padding: "32px" }}>
        <Spinner size="large" />
      </div>
    );

  if (queryPage)
    return (
      <>
        {resultPosts.data[queryName][queryPage].posts.map(
          (post: PostValues) => {
            return <PostItem key={post.id} postValues={post} />;
          }
        )}
      </>
    );

  return (
    <>
      {resultPosts.data[queryName].posts.map(
        (post: PostValues, index: number) => {
          if (
            queryName === "followingPosts" &&
            variables.skip === 0 &&
            index === 2
          )
            return (
              <React.Fragment key={post.id}>
                <PostItem postValues={post} />
                <SuggestedUserGallery />
              </React.Fragment>
            );
          return <PostItem key={post.id} postValues={post} />;
        }
      )}
    </>
  );
};
