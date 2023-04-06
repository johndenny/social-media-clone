import React, { useEffect, useState } from "react";
import {
  globalContextType,
  PreloadQuery,
  SavedPostMutationDetailsI,
} from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { PreloadLink } from "../../../PreloadLink";
import { Container, Span } from "./styled";

interface Props {
  details: SavedPostMutationDetailsI;
}

export const SavedNotification: React.FC<Props> = ({ details }) => {
  const {
    viewer,
    resultUniqueCollection,
    resultCollections,
    resultSavedPosts,
    setSavedPostMutationDetails,
  } = useGlobalContext() as globalContextType;
  const { data } = viewer;
  const { username, isCollection } = data.viewer;
  const collection = details.collection;

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClosing(true);
    }, 3000);
    return () => {
      setSavedPostMutationDetails(null);
    };
  }, []);

  const animationEndHandler = () => {
    if (isClosing) setSavedPostMutationDetails(null);
  };

  const textHandler = () => {
    switch (true) {
      case details.isDelete:
        return `Post removed from "${collection?.name}".`;

      case Boolean(collection):
        return `Saved to "${collection?.name}".`;

      case !Boolean(collection):
        return "Your post has been saved.";

      default:
        break;
    }
  };

  return (
    <Container isClosing={isClosing} onAnimationEnd={animationEndHandler}>
      <Span>{textHandler()}</Span>
      {collection && (
        <PreloadLink
          to={`/${username}/saved/${collection.nameLink}/${collection.id}/`}
          query={PreloadQuery.uniqueCollection}
          queryResult={resultUniqueCollection}
          variables={{ collectionId: collection.id, limit: 12, skip: 0 }}
          style={{ color: "rgb(var(--primary-button))" }}
        >
          View Collection
        </PreloadLink>
      )}
      {!collection && (
        <PreloadLink
          to={`/${username}/saved/`}
          query={
            isCollection ? PreloadQuery.collections : PreloadQuery.savedPosts
          }
          queryResult={isCollection ? resultCollections : resultSavedPosts}
          variables={{ limit: 12, skip: 0 }}
          style={{ color: "rgb(var(--primary-button))" }}
        >
          View Saved Posts
        </PreloadLink>
      )}
    </Container>
  );
};
