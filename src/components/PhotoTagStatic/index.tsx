import React, { useLayoutEffect, useRef, useState } from "react";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import { TagType } from "../../routes/Create";
import { Triangle } from "../../styled";
import { Container, TagContainer, Text } from "../PhotoTag/styled";
import { PreloadLink } from "../PreloadLink";

const Y_FLIPPED_MAX = 85;
const MAX_MOVE = 96;
const MIN_MOVE = 4;

interface Props {
  tagValues: TagType;
  imageWidth: number;
}

export const PhotoTagStatic = React.memo(function PhotoTag({
  tagValues,
  imageWidth,
}: Props) {
  const { username, x, y } = tagValues;

  const { user } = useGlobalContext() as globalContextType;
  const [tagTransform, setTagTransform] = useState(-50);
  const [triangleTransform, setTriangleTransform] = useState(50);
  const tagRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!tagRef.current) return;
    const { width } = tagRef?.current?.getBoundingClientRect();
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

  return (
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
      ref={tagRef}
    >
      <TagContainer>
        <Triangle
          color="rgba(0, 0, 0, 0.85)"
          height={6}
          isFlipped={tagValues.y > Y_FLIPPED_MAX}
          left={`${triangleTransform}%`}
        ></Triangle>
        <PreloadLink
          to={`/${username}/`}
          query={PreloadQuery.user}
          queryResult={user}
          variables={{ username }}
        >
          <Text>{username}</Text>
        </PreloadLink>
      </TagContainer>
    </Container>
  );
});
