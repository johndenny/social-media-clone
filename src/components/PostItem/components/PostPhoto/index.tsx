import React, { useRef, useState } from "react";
import { PhotoTagStatic } from "../../../PhotoTagStatic";
import {
  ImagePadding,
  Image,
  TagButton,
  HeartContainer,
  HeartIcon,
} from "./styled";
import { ReactComponent as TagsSvg } from "../../../../assets/svgs/tags.svg";
import { cld } from "../../../../utils/cloudinaryConfig";

export type PostPhotoType = {
  id: string;
  aspectRatio: number;
  tags: {
    id: string;
    User: {
      id: string;
      username: string;
    };
    x: number;
    y: number;
  }[];
};

interface Props {
  photo: PostPhotoType;
  likeHandler: () => void;
  isLiked: boolean;
  altText: string;
  isTagsVisible: boolean;
  setIsTagsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostPhoto: React.FC<Props> = ({
  photo,
  likeHandler,
  isLiked,
  altText,
  isTagsVisible,
  setIsTagsVisible,
}) => {
  const [isHeartVisible, setIsHeartVisible] = useState(false);
  const clickCount = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const widthRef = useRef<HTMLDivElement | null>(null);

  const toggleTags = () =>
    setIsTagsVisible((prevState) => (prevState ? false : true));

  const photoClickHandler = () => {
    clickCount.current += 1;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      toggleTags();
      clickCount.current = 0;
    }, 300);

    if (clickCount.current === 2) {
      setIsHeartVisible(true);
      if (!isLiked) likeHandler();
      clearTimeout(timerRef.current);
      clickCount.current = 0;
    }
  };
  return (
    <div ref={widthRef}>
      <ImagePadding paddingBottom={100 / photo.aspectRatio}>
        <Image
          draggable="false"
          onClick={photoClickHandler}
          alt={altText}
          src={cld.image(photo.id).toURL()}
        />
      </ImagePadding>
      {isTagsVisible && (
        <>
          {photo.tags.map((tag) => {
            if (!widthRef.current) return null;
            return (
              <PhotoTagStatic
                key={tag.User.username}
                imageWidth={widthRef.current?.clientWidth}
                tagValues={{
                  ...tag,
                  username: tag.User.username,
                  userId: tag.User.id,
                }}
              />
            );
          })}
        </>
      )}
      {photo.tags.length !== 0 && (
        <TagButton onClick={toggleTags}>
          <TagsSvg />
        </TagButton>
      )}
      <HeartContainer
        isHeartVisible={isHeartVisible}
        onAnimationEnd={() => setIsHeartVisible(false)}
      >
        <HeartIcon></HeartIcon>
      </HeartContainer>
    </div>
  );
};
