import React, { useEffect } from "react";
import { useQuery } from "urql";
import { ViewerCollectionsSelection } from "../../../../graphQL/queries";
import { ScrollActionType } from "../../../../hooks/useInfinitePagination";
import { CollectionI } from "../../../../routes/Profile/Saved/components/CollectionItem";
import { Spinner } from "../../../Spinner";
import { CollectionItem } from "./CollectionItem";

interface Props {
  variables: { limit: number; skip: number; postId: string };
  isCollected: boolean;
  scrollDispatch: React.Dispatch<ScrollActionType>;
  setSaveButtonLocation: React.Dispatch<React.SetStateAction<number | null>>;
}

export const CollectionsPage: React.FC<Props> = ({
  variables,
  isCollected,
  scrollDispatch,
  setSaveButtonLocation,
}) => {
  const [collectionsResult] = useQuery({
    query: ViewerCollectionsSelection,
    variables: {
      limit: variables.limit,
      skip: variables.skip,
      isSelection: true,
      postId: isCollected ? variables.postId : undefined,
    },
  });
  const { data, fetching } = collectionsResult;

  useEffect(() => {
    if (!data) return;

    scrollDispatch({ type: "fetching", payload: { isFetching: false } });

    if (data.collectionsPaged.isNextPage === false)
      scrollDispatch({ type: "last-page" });
  }, [data]);

  if (!data || fetching)
    return (
      <div style={{ padding: "16px" }}>
        <Spinner size="small" />
      </div>
    );

  return (
    <>
      {data.collectionsPaged.collections.map((collection: CollectionI) => {
        return (
          <CollectionItem
            key={collection.id}
            setSaveButtonLocation={setSaveButtonLocation}
            collection={collection}
            postId={variables.postId}
          />
        );
      })}
    </>
  );
};
