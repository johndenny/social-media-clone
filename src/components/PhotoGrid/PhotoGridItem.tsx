import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import React, { useState } from "react";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import useWindowSize from "../../hooks/useWindowSize";
import { Img } from "../../styled";
import { cld } from "../../utils/cloudinaryConfig";
import {
  ContentContainer,
  CountCountainer,
  DarkenLayer,
  IconContainer,
  Span,
} from "./styled";
import { CommentsSprite, LikesSprite } from "../ActivityPopUp/styled";
import { GridPostType } from ".";
import { ReactComponent as GalleryFilledSvg } from "../../assets/svgs/galleryFilled.svg";

interface Props {
  post: GridPostType;
  isWithoutHover?: boolean;
}

export const PhotoGridItem: React.FC<Props> = ({ post, isWithoutHover }) => {
  const { width } = useWindowSize();
  const { isMobile } = useGlobalContext() as globalContextType;
  const [isHovering, setIsHovering] = useState(false);
  const { id } = post.photos[0];
  const image150 = cld.image(id).resize(thumbnail().width(150).height(150));
  const image240 = cld.image(id).resize(thumbnail().width(240).height(240));
  const image320 = cld.image(id).resize(thumbnail().width(320).height(320));
  const image480 = cld.image(id).resize(thumbnail().width(480).height(480));
  const image640 = cld.image(id).resize(thumbnail().width(640).height(640));

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && !isMobile && !isWithoutHover && (
        <DarkenLayer>
          <ContentContainer>
            {post.counts.likes !== 0 && (
              <CountCountainer>
                <LikesSprite></LikesSprite>
                <Span>{post.counts.likes}</Span>
              </CountCountainer>
            )}
            <CountCountainer>
              <CommentsSprite></CommentsSprite>
              <Span>{post.counts.comments}</Span>
            </CountCountainer>
          </ContentContainer>
        </DarkenLayer>
      )}
      {post.photos.length > 1 && (
        <IconContainer>
          <GalleryFilledSvg
            height={width > 735 ? 24 : 18}
            width={width > 735 ? 24 : 18}
          />
        </IconContainer>
      )}

      <Img
        alt={post.text}
        sizes={`${width > 935 ? 935 / 3 : width / 3}px`}
        srcSet={`${image150.toURL()} 150w, ${image240.toURL()} 240w, ${image320.toURL()} 320w, ${image480.toURL()} 480w, ${image640.toURL()} 640w`}
      />
    </div>
  );
};
