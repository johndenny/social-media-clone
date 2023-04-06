import React, { useContext, useRef, useState } from "react";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../../../context/CreatePostContext";
import useWindowSize from "../../../../hooks/useWindowSize";
import { PhotoTag } from "../../../PhotoTag";
import { NavigationButtons } from "../Crop/NavigationButtons";
import { Button } from "../Crop/styled";
import { SideMenu } from "./SideMenu";
import {
  Container,
  PhotoBoundary,
  PhotoContainer,
  TagButtonContainer,
} from "./styled";
import { ReactComponent as TagsSvg } from "../../../../assets/svgs/tags.svg";
import { InstructionPopUp } from "../InstructionPopUp";

interface Props {}

export const Details: React.FC<Props> = () => {
  const {
    photosToUploadState,
    selectedIndex,
    setTagSearchLocation,
    instructionConsumed,
  } = useContext(CreatePostContext) as CreatePostContextType;
  const { width, height } = useWindowSize();
  const photoRef = useRef<HTMLDivElement | null>(null);

  const [isTagsVisible, setIsTagsVisible] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isInstructionVisible, setIsInstructionVisible] = useState(true);
  const [isInstructionAnimating, setIsInstructionAnimating] = useState(false);

  const maxWidthHandler = () => {
    if (width < 855 + 340 + 40) return width - 340 - 40;
    return height - 88 > 855 ? 855 : height - 88;
  };

  const clickLocationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!photoRef.current) return;

    const photo = photoRef.current?.getBoundingClientRect();
    const photoX = photo?.x;
    const photoY = photo?.y;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const differenceX = mouseX - photoX;
    const differenceY = mouseY - photoY;
    const xPercent = (differenceX / photo.width) * 100;
    const yPercent = (differenceY / photo.height) * 100;

    setTagSearchLocation({
      xPercent,
      yPercent,
      clientX: mouseX,
      clientY: mouseY,
    });
    setIsTagsVisible(true);
    setIsInstructionAnimating(true);
  };

  return (
    <Container>
      <PhotoContainer
        style={{
          width: `${maxWidthHandler()}px`,
        }}
      >
        {isInstructionVisible && !instructionConsumed.tags && (
          <InstructionPopUp
            type="tags"
            setVisibleState={setIsInstructionVisible}
            isAnimating={isInstructionAnimating}
            setAnimationState={setIsInstructionAnimating}
          >
            Click photo to tag people
          </InstructionPopUp>
        )}
        <PhotoBoundary ref={photoRef} onClick={clickLocationHandler}>
          <img
            draggable={false}
            alt=""
            src={photosToUploadState[selectedIndex].url}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            onLoad={() => setIsImageLoaded(true)}
          />
          {isTagsVisible &&
            isImageLoaded &&
            photosToUploadState[selectedIndex].tags.map((tag) => {
              if (!photoRef.current) return null;
              return (
                <PhotoTag
                  key={tag.username}
                  tagValues={tag}
                  imageWidth={photoRef.current.clientWidth}
                  imageHeight={photoRef.current.clientHeight}
                />
              );
            })}
        </PhotoBoundary>
        <NavigationButtons />
        {photosToUploadState[selectedIndex].tags.length !== 0 && (
          <TagButtonContainer>
            <Button
              onClick={() =>
                setIsTagsVisible((prevState) => (prevState ? false : true))
              }
            >
              <TagsSvg height={14} width={14} />
            </Button>
          </TagButtonContainer>
        )}
      </PhotoContainer>

      <SideMenu />
    </Container>
  );
};
