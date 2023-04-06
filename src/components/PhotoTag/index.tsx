import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  CreatePostContext,
  CreatePostContextType,
} from "../../context/CreatePostContext";
import { TagType, useCreateContext } from "../../routes/Create";
import { Triangle } from "../../styled";
import { ClickCatch } from "../Navigation/styled";
import { ClearIcon } from "../SearchMobile/styled";
import { Container, DeleteButton, TagContainer, Text } from "./styled";

const Y_FLIPPED_MAX = 85;
const MAX_MOVE = 99;
const MIN_MOVE = 1;

interface Props {
  tagValues: TagType;
  imageWidth: number;
  imageHeight: number;
}

type TouchType = {
  x: number;
  y: number;
};

export const PhotoTag = React.memo(function PhotoTag({
  tagValues,
  imageWidth,
  imageHeight,
}: Props) {
  const { username, x, y } = tagValues;
  const [isSelected, setIsSelected] = useState(false);
  const mobileCreateContext = useCreateContext();
  const wideCreateContext = useContext(
    CreatePostContext
  ) as CreatePostContextType;

  const [touchOrigin, setTouchOrigin] = useState<TouchType>();
  const [tagOrigin, setTagOrigin] = useState<TouchType>();
  const [tagOverflow, setTagOverflow] = useState<number>();
  const [movement, setMovement] = useState<TouchType>();
  const [isDragging, setIsDragging] = useState(false);
  const [tagTransform, setTagTransform] = useState(-50);
  const [triangleTransform, setTriangleTransform] = useState(50);
  const tagRef = useRef<HTMLDivElement>(null);

  const touchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTouchOrigin({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setTagOrigin({ x: tagValues.x, y: tagValues.y });
  };

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (mobileCreateContext) return;

    setTouchOrigin({ x: e.clientX, y: e.clientY });
    setTagOrigin({ x: tagValues.x, y: tagValues.y });
  };

  useEffect(() => {
    if (!touchOrigin || !mobileCreateContext) return;
    window.addEventListener("touchmove", touchMoveHandler);

    return () => {
      window.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [touchOrigin]);

  useEffect(() => {
    if (!touchOrigin || !wideCreateContext) return;
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, [touchOrigin]);

  const touchMoveHandler = (e: TouchEvent) => {
    setIsDragging(true);
    setMovement({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    setIsDragging(true);
    setMovement({ x: e.clientX, y: e.clientY });
  };

  //adds movement to previous tag location and stays within bounds
  useEffect(() => {
    if (!imageWidth || !movement || !touchOrigin || !tagOrigin || !tagOverflow)
      return;
    let x = ((movement.x - touchOrigin.x) / imageWidth) * 100 + tagOrigin.x;
    let y = ((movement.y - touchOrigin.y) / imageHeight) * 100 + tagOrigin.y;

    if (x < MIN_MOVE) x = MIN_MOVE;
    if (y < MIN_MOVE) y = MIN_MOVE;

    if (x > MAX_MOVE) x = MAX_MOVE;
    if (y > MAX_MOVE) y = MAX_MOVE;

    if (mobileCreateContext)
      mobileCreateContext.tagDispatch({
        type: "add",
        payload: { ...tagValues, x, y },
      });
    if (wideCreateContext)
      wideCreateContext.photosToUploadDispatch({
        type: "add-tag",
        payload: {
          selectedIndex: wideCreateContext.selectedIndex,
          tag: { ...tagValues, x, y },
        },
      });
    transformTag(x, tagOverflow);
  }, [movement]);

  useLayoutEffect(() => {
    if (!tagRef.current) return;
    const { width } = tagRef?.current?.getBoundingClientRect();
    setTagOverflow(width / 2);
    transformTag(x, width / 2);
  }, []);

  //transforms tag to stay within bounds of the image visually.
  const transformTag = (x: number, tagOverflow: number) => {
    const tagOverflowPercent = (tagOverflow / imageWidth) * 100;
    if (x > MAX_MOVE - tagOverflowPercent) {
      const overflow = x - (MAX_MOVE - tagOverflowPercent);
      const overflowPercent = -50 - ((overflow / tagOverflowPercent) * 100) / 2;
      const maxTriangleLeft = 100 - (6 / tagOverflow) * 100;
      setTagTransform(overflowPercent);
      setTriangleTransform(
        overflowPercent * -1 > maxTriangleLeft
          ? maxTriangleLeft
          : overflowPercent * -1
      );
    } else if (x < MIN_MOVE + tagOverflowPercent) {
      const overflow = x - (MIN_MOVE + tagOverflowPercent);
      const overflowPercent = -50 - ((overflow / tagOverflowPercent) * 100) / 2;
      const minTriangleLeft = (6 / tagOverflow) * 100;
      setTagTransform(overflowPercent);
      setTriangleTransform(
        overflowPercent * -1 < minTriangleLeft
          ? minTriangleLeft
          : overflowPercent * -1
      );
    } else {
      setTagTransform(-50);
      setTriangleTransform(50);
    }
  };

  const touchEndHandler = () => {
    if (!isDragging) setIsSelected((prevState) => (prevState ? false : true));
    setIsDragging(false);
    setTouchOrigin(undefined);
  };

  return (
    <>
      <Container
        left={x}
        top={y}
        transformTranslate={
          tagValues.y > Y_FLIPPED_MAX
            ? { x: tagTransform, y: -100 }
            : { x: tagTransform, y: 0 }
        }
        paddingBottom={tagValues.y > Y_FLIPPED_MAX ? 6 : 0}
        paddingTop={tagValues.y > Y_FLIPPED_MAX ? 0 : 6}
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={touchEndHandler}
        onClick={(e) => e.stopPropagation()}
        ref={tagRef}
      >
        <TagContainer>
          <Triangle
            color="rgba(0, 0, 0, 0.85)"
            height={6}
            isFlipped={tagValues.y > Y_FLIPPED_MAX}
            left={`${triangleTransform}%`}
          ></Triangle>
          <Text>{username}</Text>
          {isSelected && (
            <DeleteButton
              onTouchStart={() =>
                mobileCreateContext
                  ? mobileCreateContext.tagDispatch({
                      type: "delete",
                      payload: tagValues,
                    })
                  : null
              }
              onMouseUp={(e) => e.stopPropagation()}
              onClick={() =>
                wideCreateContext
                  ? wideCreateContext.photosToUploadDispatch({
                      type: "remove-tag",
                      payload: {
                        selectedIndex: wideCreateContext.selectedIndex,
                        tag: tagValues,
                      },
                    })
                  : null
              }
            >
              <ClearIcon></ClearIcon>
            </DeleteButton>
          )}
        </TagContainer>
      </Container>
      {isDragging && (
        <ClickCatch
          onClick={(e) => e.stopPropagation()}
          onMouseUp={touchEndHandler}
        ></ClickCatch>
      )}
    </>
  );
});
