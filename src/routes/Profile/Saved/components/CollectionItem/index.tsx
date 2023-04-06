import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GridPostType } from "../../../../../components/PhotoGrid";
import { PreloadLink } from "../../../../../components/PreloadLink";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../../context/GlobalContext";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { Img } from "../../../../../styled";
import { cld } from "../../../../../utils/cloudinaryConfig";
import {
  Container,
  InnerGrid,
  Placeholder,
  SelectedContainer,
  SelectionButton,
  Title,
} from "./styled";
import { ReactComponent as CheckmarkSvg } from "../../../../../assets/svgs/checkmark.svg";

export interface CollectionI {
  id: string;
  name: string;
  nameLink: string;
  isCollected: boolean;
  posts: GridPostType[];
}

interface Props {
  collection: CollectionI;
  isSelection?: boolean;
  postId?: string;
}

export const CollectionItem: React.FC<Props> = ({
  collection,
  isSelection,
  postId,
}) => {
  const {
    viewer,
    resultSavedPosts,
    resultUniqueCollection,
    saveToCollectionHandler,
    removeCollectionPostHandler,
  } = useGlobalContext() as globalContextType;
  const [postsArray, setPostsArray] = useState<GridPostType[]>([]);
  const isAllPosts = collection.id === `allPosts${viewer.data?.viewer.id}`;
  const firstPhoto = cld
    .image(collection.posts[0]?.photos[0].id)
    .resize(thumbnail().width(340).height(340));

  useLayoutEffect(() => {
    if (collection.posts.length === 3 || collection.posts.length === 2) {
      const filler = Array(4 - collection.posts.length).fill(null);
      const newArray = collection.posts.concat(filler);
      return setPostsArray(newArray);
    }
    setPostsArray(collection.posts);
  }, [collection]);

  const onClickHandler = () => {
    if (postId)
      return collection.isCollected
        ? removeCollectionPostHandler(postId, collection)
        : saveToCollectionHandler(postId, collection);
  };

  if (isSelection && postId)
    return (
      <SelectionButton role={"button"} onClick={onClickHandler}>
        <Container>
          {collection.isCollected && (
            <SelectedContainer>
              <CheckmarkSvg />
            </SelectedContainer>
          )}

          {postsArray.length === 1 ? (
            <Img src={firstPhoto.toURL()} />
          ) : (
            <InnerGrid>
              {postsArray.map((post, index) => {
                if (post === null)
                  return (
                    <Placeholder
                      key={"placeholder" + index}
                      index={index}
                    ></Placeholder>
                  );

                const firstPhoto = post.photos[0];
                const photo170 = cld
                  .image(firstPhoto.id)
                  .resize(thumbnail().width(170).height(170));

                return (
                  <div key={post.id}>
                    <Img alt={post.text} src={photo170.toURL()} />
                  </div>
                );
              })}
            </InnerGrid>
          )}
        </Container>
        <Title>{collection.name}</Title>
      </SelectionButton>
    );

  return (
    <PreloadLink
      to={
        isAllPosts ? "all-posts/" : `${collection.nameLink}/${collection.id}/`
      }
      query={
        isAllPosts ? PreloadQuery.savedPosts : PreloadQuery.uniqueCollection
      }
      queryResult={isAllPosts ? resultSavedPosts : resultUniqueCollection}
      variables={
        isAllPosts
          ? { limit: 12, skip: 0 }
          : { collectionId: collection.id, limit: 12, skip: 0 }
      }
      style={{ minWidth: "0" }}
    >
      <Container>
        {postsArray.length === 1 ? (
          <Img src={firstPhoto.toURL()} />
        ) : (
          <InnerGrid>
            {postsArray.map((post, index) => {
              if (post === null)
                return (
                  <Placeholder
                    key={"placeholder" + index}
                    index={index}
                  ></Placeholder>
                );

              const firstPhoto = post.photos[0];
              const photo170 = cld
                .image(firstPhoto.id)
                .resize(thumbnail().width(170).height(170));

              return (
                <div key={post.id} style={{ flex: 1 }}>
                  <Img alt={post.text} src={photo170.toURL()} />
                </div>
              );
            })}
          </InnerGrid>
        )}
      </Container>
      <Title>{collection.name}</Title>
    </PreloadLink>
  );
};
