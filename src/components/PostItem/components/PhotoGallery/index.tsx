import React, { useLayoutEffect, useRef, useState } from "react";
import { useGalleryNavigation } from "../../../../hooks/useGalleryNavigation";
import useWindowSize from "../../../../hooks/useWindowSize";
import {
  ChevronSprite,
  NavigationButton,
} from "../../../CreatePost/components/Crop/GalleryModal/styled";
import { StepIndicator } from "../../../CreatePost/components/Crop/NavigationButtons/styled/StepIndicator";
import { PostPhoto, PostPhotoType } from "../PostPhoto";
import { ImagePadding } from "../PostPhoto/styled";
import {
  Container,
  IndicatorContainer,
  ListItem,
  UnorderedList,
} from "./styled";

interface Props {
  photos: PostPhotoType[];
  likeHandler: () => void;
  isLiked: boolean;
  altText: string;
  photoWidth?: number;
  isWide?: boolean;
  isTagsVisible: boolean;
  setIsTagsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PhotoGallery: React.FC<Props> = ({
  photos,
  likeHandler,
  isLiked,
  altText,
  photoWidth,
  isWide,
  isTagsVisible,
  setIsTagsVisible,
}) => {
  const { width } = useWindowSize();
  const [postWidth, setPostWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const maxMovement = (photos.length - 1) * (photoWidth || postWidth);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setPostWidth(containerRef.current.clientWidth);
  }, [width]);

  const [navigationHandler, galleryState, galleryDispatch] =
    useGalleryNavigation({
      itemWidth: photoWidth || postWidth,
      maxMovement,
      arrayLength: photos.length - 1,
    });

  const { isDragging, dragDistance, isTransition, selectedIndex, itemsPassed } =
    galleryState;

  return (
    <div
      ref={containerRef}
      onTouchStart={() => galleryDispatch({ type: "touched" })}
    >
      <ImagePadding paddingBottom={100 / photos[0].aspectRatio}></ImagePadding>
      <Container>
        <UnorderedList
          translateX={
            isDragging
              ? dragDistance
              : selectedIndex * (photoWidth || postWidth)
          }
          style={
            isTransition
              ? { transition: "transform .3s ease-in-out" }
              : undefined
          }
          onTransitionEnd={() => galleryDispatch({ type: "reset" })}
        >
          {(photoWidth || postWidth) &&
            photos.map((photo, index) => {
              if (selectedIndex - 2 > index) return undefined;
              if (selectedIndex + 2 < index) return undefined;

              return (
                <ListItem
                  key={photo.id}
                  style={{
                    transform: `translateX(${
                      index * (photoWidth || postWidth)
                    }px)`,
                  }}
                >
                  <div style={{ width: `${photoWidth || postWidth}px` }}>
                    <PostPhoto
                      isTagsVisible={isTagsVisible}
                      setIsTagsVisible={setIsTagsVisible}
                      photo={photo}
                      likeHandler={likeHandler}
                      isLiked={isLiked}
                      altText={altText}
                    />
                  </div>
                </ListItem>
              );
            })}
        </UnorderedList>
        {selectedIndex !== 0 && (
          <NavigationButton
            left
            transparent
            onClick={() =>
              navigationHandler({
                direction: "left",
                isTransition: true,
                itemsPassed: -1,
              })
            }
          >
            <ChevronSprite left></ChevronSprite>
          </NavigationButton>
        )}
        {selectedIndex !== photos.length - 1 && (
          <NavigationButton
            right
            transparent
            onClick={() =>
              navigationHandler({
                direction: "right",
                isTransition: true,
                itemsPassed: 1,
              })
            }
          >
            <ChevronSprite right></ChevronSprite>
          </NavigationButton>
        )}
      </Container>
      <IndicatorContainer isWide={isWide}>
        {photos.map((photo, index) => {
          return (
            <StepIndicator
              key={photo.id + "indicator"}
              selected={selectedIndex + itemsPassed === index}
              isWide={isWide}
            ></StepIndicator>
          );
        })}
      </IndicatorContainer>
    </div>
  );
};
