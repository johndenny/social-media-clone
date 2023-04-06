import React from "react";
import { useQuery } from "urql";
import { ViewerCollectionsSelection } from "../../../../graphQL/queries";
import {
  CollectionI,
  CollectionItem,
} from "../../../../routes/Profile/Saved/components/CollectionItem";
import { CollectionItemPlaceholder } from "./CollectionItemPlaceholder";
import { Container } from "./styled";

interface Props {
  postId: string;
  isCollected?: boolean;
}

export const CollectionsRows: React.FC<Props> = ({ postId, isCollected }) => {
  const [collectionsResult] = useQuery({
    query: ViewerCollectionsSelection,
    variables: {
      limit: 16,
      skip: 0,
      isSelection: true,
      postId: isCollected ? postId : undefined,
    },
  });
  const { data, fetching } = collectionsResult;

  return (
    <Container onTouchStart={(e) => e.stopPropagation()}>
      {!data || fetching ? (
        <>
          <CollectionItemPlaceholder />
          <CollectionItemPlaceholder />
          <CollectionItemPlaceholder />
        </>
      ) : (
        <>
          {data.collectionsPaged.collections.map((collection: CollectionI) => {
            return (
              <CollectionItem
                key={collection.id}
                collection={collection}
                isSelection={true}
                postId={postId}
              />
            );
          })}
        </>
      )}
    </Container>
  );
};
