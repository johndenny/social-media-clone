import React, { useEffect, useState } from "react";
import { Article } from "./styled";
import { useMutation } from "urql";
import { Like, Unlike } from "../../graphQL/mutations";
import { PostHeader } from "./components/PostHeader";
import { PostPhoto, PostPhotoType } from "./components/PostPhoto";
import { FeaturedCommentType, PostFooter } from "./components/PostFooter";
import { PostItemWide } from "../PostItemWide";
import useWindowSize from "../../hooks/useWindowSize";
import { CommentInput } from "../../routes/Post/Comments/components/CommentInput";
import { PhotoGallery } from "./components/PhotoGallery";
import { UserListI } from "../../types";
import { PostLocationI } from "../../routes/Create";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType } from "../../context/GlobalContext";

export interface PostValues {
  createdAt: string;
  id: string;
  text: string;
  isEdited: boolean;
  isLiked: boolean;
  isSaved: boolean;
  likeCount: number;
  counts: {
    comments: number;
    likes: number;
  };
  postedBy: UserListI;
  photos: PostPhotoType[];
  featuredComments: FeaturedCommentType[];
  location: PostLocationI;
  isCollected: boolean;
  isTagged: boolean;
  isTagHidden: boolean;
}

interface Props {
  postValues: PostValues;
  isWide?: boolean;
  isModal?: boolean;
}

export const PostItem = React.memo(function ({
  postValues,
  isWide,
  isModal,
}: Props) {
  const { postedBy, createdAt, text, photos, isLiked, id } = postValues;
  const { viewer, setModalAttrs } = useGlobalContext() as globalContextType;
  const { width } = useWindowSize();
  const [likeResult, likeMutation] = useMutation(Like);
  const [unlikeResult, unlikeMutation] = useMutation(Unlike);

  const [isClicked, setIsClicked] = useState(false);
  const [isTagsVisible, setIsTagsVisible] = useState(false);
  const isLoggedIn = Boolean(viewer.data);

  const likeHandler = () => {
    if (!isLoggedIn) setModalAttrs({ type: "log-in" });

    if (likeResult.fetching || unlikeResult.fetching) return;
    setIsClicked(true);

    if (isLiked) {
      unlikeMutation({
        postId: id,
      });

      return;
    }

    likeMutation({
      postId: id,
    });
  };

  if (isWide)
    return (
      <PostItemWide
        postValues={postValues}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        likeHandler={likeHandler}
        isModal={isModal}
      />
    );
  return (
    <Article>
      <PostHeader post={postValues} />
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
          photos={photos}
          likeHandler={likeHandler}
          isLiked={isLiked}
          altText={`posted by @${postedBy.username} on ${createdAt}. ${text}`}
        />
      )}

      <PostFooter
        postValues={postValues}
        likeHandler={likeHandler}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      {width > 735 && <CommentInput isWide={true} postId={id} />}
    </Article>
  );
});
