import React, { useEffect } from "react";
import { useQuery } from "urql";
import { PhotoGrid } from ".";
import {
  PageVariablesI,
  ScrollActionType,
} from "../../hooks/useInfinitePagination";
import { CollectionGrid } from "../../routes/Profile/Saved/components/CollectionGrid";
import { Spinner } from "../Spinner";

interface PhotoGridPageVariablesI extends PageVariablesI {
  username?: string;
  locationId?: number;
  name?: string;
  collectionId?: string;
}

interface Props {
  variables: PhotoGridPageVariablesI;
  scrollDispatch: React.Dispatch<ScrollActionType>;
  query: string;
  queryName: string;
  pageName?: string;
  postIds?: string[];
  setPostIds?: React.Dispatch<React.SetStateAction<string[]>>;
  isCollection?: boolean;
}

export const PhotoGridPage: React.FC<Props> = ({
  variables,
  scrollDispatch,
  query,
  queryName,
  pageName,
  setPostIds,
  postIds,
  isCollection,
}) => {
  const [resultPosts] = useQuery({ query, variables });
  const { data, fetching } = resultPosts;
  const postsPage = data
    ? pageName
      ? data[queryName][pageName]
      : data[queryName]
    : undefined;

  useEffect(() => {
    if (!resultPosts.data) return;

    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    if (postsPage.isNextPage === false) scrollDispatch({ type: "last-page" });
  }, [data]);

  console.log(resultPosts);

  if (!data || fetching) return <Spinner size={"large"} />;

  if (isCollection)
    return <CollectionGrid collections={postsPage.collections} />;

  return (
    <PhotoGrid
      postIds={postIds}
      setPostIds={setPostIds}
      posts={postsPage.posts}
    />
  );
};
