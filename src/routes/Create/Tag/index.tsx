import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateContext } from "..";
import {
  LeftHeaderButton,
  RightHeaderButton,
} from "../../../components/HeaderMobile";
import { PhotoTag } from "../../../components/PhotoTag";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import useWindowSize from "../../../hooks/useWindowSize";
import { TagSearch } from "./components/TagSearch";
import {
  AbsoluteContainer,
  Container,
  PhotoContainer,
  TextContainer,
} from "./styled";

interface Props {}

export type ImageDimensionsType = {
  width: number;
  height: number;
};

export const Tag: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { imageToUpload, setHeaderAttrs, setIsFooterNavHidden } =
    useGlobalContext() as globalContextType;
  const { tagDispatch, tagState, setTagLocation, tagLocation } =
    useCreateContext();
  const { pendingTags } = tagState;
  const { width } = useWindowSize();
  const photoRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1);

  const saveTags = () => {
    tagDispatch({ type: "save" });
    navigate(-1);
  };

  useLayoutEffect(() => {
    setHeaderAttrs({
      leftButton: LeftHeaderButton.close,
      leftOnClick: () => navigate(-1),
      title: "Tag people",
      rightButton: RightHeaderButton.done,
      rightOnClick: saveTags,
    });
    setIsFooterNavHidden(true);
    if (photoRef?.current) {
      const { width, height } = photoRef.current.getBoundingClientRect();
      setAspectRatio(width / height);
    }
    return () => {
      tagDispatch({ type: "cancel" });
    };
  }, []);

  const clickHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    //touch location on photo
    const { top, left, height, width } =
      e.currentTarget.getBoundingClientRect();
    let x = e.touches[0].pageX - left;
    let y = e.touches[0].pageY - top;
    if (y < 0) y = 0;
    if (y > height) y = height;
    //convert to percent of image.
    x = (x / width) * 100;
    y = (y / height) * 100;
    setTagLocation({ x, y });
  };

  if (tagLocation) return <TagSearch />;

  return (
    <Container>
      <PhotoContainer aspectRatio={aspectRatio}>
        <AbsoluteContainer>
          <div onTouchStart={clickHandler} ref={photoRef}>
            <img alt="Tag placement" src={imageToUpload?.url} />
            {pendingTags.map((tag) => {
              return (
                <PhotoTag
                  key={tag.username}
                  tagValues={tag}
                  imageWidth={width}
                  imageHeight={width / aspectRatio}
                />
              );
            })}
          </div>
        </AbsoluteContainer>
      </PhotoContainer>

      <TextContainer>
        <p>Tap photo to tag people.</p>
        {pendingTags.length !== 0 && <p>Drag to move, or tap to remove.</p>}
      </TextContainer>
    </Container>
  );
};
