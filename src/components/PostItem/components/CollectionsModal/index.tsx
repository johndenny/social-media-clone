import React from "react";
import { Triangle } from "../../../../styled";
import { Container, Header, ListContainer } from "./styled";
import { ReactComponent as PlusSvg } from "../../../../assets/svgs/plus.svg";
import { useInfinitePagination } from "../../../../hooks/useInfinitePagination";
import { CollectionsPage } from "./CollectionsPage";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { globalContextType } from "../../../../context/GlobalContext";

interface Props {
  postId: string;
  photoId: string;
  isCollected: boolean;
  setSaveButtonLocation: React.Dispatch<React.SetStateAction<number | null>>;
  isFlipped: boolean;
}

export const CollectionsModal: React.FC<Props> = ({
  postId,
  photoId,
  isCollected,
  setSaveButtonLocation,
  isFlipped,
}) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;

  const { scrollDispatch, scrollRef, scrollState, viewportRef } =
    useInfinitePagination({ limit: 16, type: "modal" });

  const clickHandler = () => {
    setSaveButtonLocation(null);
    setModalAttrs({
      type: "save-to-new-collection",
      variables: { id: postId, photoId },
    });
  };

  return (
    <Container isFlipped={isFlipped}>
      <Header>
        <h2>Collections</h2>
        <button onClick={clickHandler}>
          <PlusSvg height={16} width={16} fill="rgb(var(--primary-text)" />
        </button>
      </Header>
      <div ref={viewportRef}>
        <ListContainer ref={scrollRef}>
          {scrollState.moreVars.map((page) => {
            return (
              <CollectionsPage
                key={page.limit + page.skip}
                variables={{ ...page, postId }}
                isCollected={isCollected}
                scrollDispatch={scrollDispatch}
                setSaveButtonLocation={setSaveButtonLocation}
              />
            );
          })}
        </ListContainer>
      </div>
      <Triangle
        color="rgb(var(--primary-background))"
        height={12}
        isFlipped={!isFlipped}
        left={"50%"}
      />
    </Container>
  );
};
