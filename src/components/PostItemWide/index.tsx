import React, { useLayoutEffect, useRef, useState } from "react";
import { globalContextType } from "../../context/GlobalContext";
import useGlobalContext from "../../hooks/useGlobalContext";
import useWindowSize from "../../hooks/useWindowSize";
import { Comments } from "../../routes/Post/Comments";
import { CommentInput } from "../../routes/Post/Comments/components/CommentInput";
import { PostValues } from "../PostItem";
import { PhotoGallery } from "../PostItem/components/PhotoGallery";
import { PostFooter } from "../PostItem/components/PostFooter";
import { PostHeader } from "../PostItem/components/PostHeader";
import { PostPhoto } from "../PostItem/components/PostPhoto";
import { PhotoContainer } from "../PostItem/components/PostPhoto/styled";
import {
  Article,
  Button,
  CommentContainer,
  CommentInputPlaceholder,
  PostDetails,
} from "./styled";

interface Props {
  postValues: PostValues;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  likeHandler: () => void;
  isModal: boolean | undefined;
}

export const PostItemWide: React.FC<Props> = ({
  postValues,
  isClicked,
  setIsClicked,
  likeHandler,
  isModal,
}) => {
  const { postedBy, createdAt, text, photos, isLiked, id } = postValues;
  const { viewer, setModalAttrs } = useGlobalContext() as globalContextType;
  const { width, height } = useWindowSize();
  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isTagsVisible, setIsTagsVisible] = useState(false);
  const wideScrollRef = useRef<HTMLUListElement>(null);

  const modalSizesHandler = () => {
    const { aspectRatio } = postValues.photos[0];
    let maxPhotoHeight = height - 120;
    let maxPhotoWidth = width - 560;

    let modalHeight = maxPhotoHeight;
    let photoWidth = maxPhotoHeight * aspectRatio;
    if (photoWidth > maxPhotoWidth) {
      photoWidth = maxPhotoHeight;
    }
    if (photoWidth > maxPhotoWidth) {
      photoWidth = maxPhotoWidth;
    }
    if (aspectRatio > 1) {
      if (modalHeight > photoWidth) {
        modalHeight = photoWidth;
      }
      if (modalHeight < photoWidth) {
        photoWidth = modalHeight;
      }
      if (photoWidth < maxPhotoWidth) {
        modalHeight = photoWidth;
      }
    }
    if (aspectRatio <= 1) {
      let photoHeight = photoWidth / aspectRatio;
      if (photoHeight < maxPhotoHeight) {
        modalHeight = photoHeight;
      }
    }

    setModalDimensions({ width: photoWidth, height: modalHeight });
  };

  useLayoutEffect(() => {
    if (!isModal) return;
    modalSizesHandler();
  }, [width, height, postValues.photos[0].aspectRatio]);

  return (
    <Article height={isModal ? modalDimensions.height + 60 : undefined}>
      <PhotoContainer
        width={isModal ? modalDimensions.width : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {photos.length === 1 ? (
          <PostPhoto
            isTagsVisible={isTagsVisible}
            setIsTagsVisible={setIsTagsVisible}
            photo={photos[0]}
            likeHandler={likeHandler}
            isLiked={isLiked}
            altText={`posted by @${postedBy.username} on ${createdAt}. ${text}`}
          />
        ) : (
          <PhotoGallery
            isTagsVisible={isTagsVisible}
            setIsTagsVisible={setIsTagsVisible}
            photoWidth={modalDimensions.width}
            photos={photos}
            likeHandler={likeHandler}
            isLiked={isLiked}
            altText={`posted by @${postedBy.username} on ${createdAt}. ${text}`}
            isWide={true}
          />
        )}
      </PhotoContainer>

      <PostDetails isModal={isModal} onClick={(e) => e.stopPropagation()}>
        <PostHeader post={postValues} />
        <CommentContainer>
          <Comments
            passedPost={postValues}
            isWide={true}
            wideScrollRef={wideScrollRef}
          />
        </CommentContainer>
        <PostFooter
          postValues={postValues}
          isModal={true}
          likeHandler={likeHandler}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          isWide={true}
        />
        {viewer.data ? (
          <CommentInput isWide={true} postId={id} scrollRef={wideScrollRef} />
        ) : (
          <CommentInputPlaceholder>
            <Button onClick={() => setModalAttrs({ type: "log-in" })}>
              Sign in
            </Button>
            to comment, like or save post.
          </CommentInputPlaceholder>
        )}
      </PostDetails>
    </Article>
  );
};
