import React, { useRef, useState } from "react";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import { postDate } from "../../../../utils/DateFormat";
import { MoreText } from "../../../MoreText";
import { PreloadLink } from "../../../PreloadLink";
import { Button } from "../../styled";
import { FeaturedCommentItem } from "../FeaturedCommentItem";
import {
  ButtonList,
  Caption,
  CommentLink,
  CommentsPreload,
  Footer,
  LikeAnimation,
  Save,
  TextContainer,
  TextSection,
  Time,
} from "./styled";
import { ReactComponent as UnLikeSvg } from "../../../../assets/svgs/activity.svg";
import { ReactComponent as LikeSvg } from "../../../../assets/svgs/activitySelected.svg";
import { ReactComponent as CommentSvg } from "../../../../assets/svgs/comment.svg";
import { ReactComponent as SendSvg } from "../../../../assets/svgs/send.svg";
import { ReactComponent as UnsaveSvg } from "../../../../assets/svgs/unsaved.svg";
import { ReactComponent as SaveSvg } from "../../../../assets/svgs/saved.svg";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { useMutation } from "urql";
import { SavePost, UnsavePost } from "../../../../graphQL/mutations";
import { SecondaryPreload } from "../../../CommentItem/styled";
import { Link, useLocation } from "react-router-dom";
import { UsernameLink } from "../../../UsernameLink";
import { PostValues } from "../..";
import { SavedNotification } from "../SavedNotification";
import { SavedModalContainer } from "./styled/SavedModalContainer";
import { CollectionsModal } from "../CollectionsModal";

export type FeaturedCommentType = {
  id: string;
  text: string;
  postedBy: { username: string };
  isLiked: boolean;
};

interface Props {
  postValues: PostValues;
  likeHandler: () => void;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isWide?: boolean;
  isModal?: boolean;
  isGallery?: boolean;
}

export const PostFooter: React.FC<Props> = ({
  postValues,
  likeHandler,
  isClicked,
  setIsClicked,
  isWide,
  isModal,
}) => {
  const {
    isLiked,
    isSaved,
    isCollected,
    id,
    likeCount,
    counts,
    text,
    postedBy,
    createdAt,
    featuredComments,
    photos,
  } = postValues;
  const {
    resultPost,
    setModalAttrs,
    resultPostLikes,
    isMobile,
    savedPostMutationDetails,
    setSavedPostMutationDetails,
    viewer,
  } = useGlobalContext() as globalContextType;
  const location = useLocation();
  const [savePostResult, savePostMutation] = useMutation(SavePost);
  const [unsavePostResult, unsavePostMutation] = useMutation(UnsavePost);
  const [saveButtonLocation, setSaveButtonLocation] = useState<number | null>(
    null
  );

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCollection = viewer.data?.viewer.isCollection;
  const isLoggedIn = Boolean(viewer.data);

  const savePostHandler = () => {
    if (!isLoggedIn) return setModalAttrs({ type: "log-in" });

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveButtonLocation(null);

    if (savePostResult.fetching || unsavePostResult.fetching) return;

    if (isCollected)
      return setModalAttrs({ type: "delete-saved-post", variables: { id } });
    if (isSaved) return unsavePostMutation({ postId: id });

    setSavedPostMutationDetails({ postId: id });
    savePostMutation({ postId: id, post: postValues }).then((result) => {});
  };

  const touchDownHandler = () => {
    if (!isLoggedIn) return;

    saveTimerRef.current = setTimeout(() => {
      setModalAttrs({
        type: "save-to-collection",
        variables: {
          id,
          photoId: photos[0].id,
          isCollected,
        },
      });
    }, 1000);
  };

  const touchEndHandler = () =>
    saveTimerRef.current ? clearTimeout(saveTimerRef.current) : null;

  const mouseEnterSaveHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (
      !isCollection ||
      isMobile ||
      !isLoggedIn ||
      savePostResult.fetching ||
      unsavePostResult.fetching
    )
      return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(() => {
      setSaveButtonLocation(e.clientY);
    }, 500);
  };

  const mouseLeaveSaveHandler = () => {
    if (!isCollection || isMobile || !isLoggedIn) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(() => {
      setSaveButtonLocation(null);
    }, 500);
  };

  const sharePostHandler = () => {
    if (!isLoggedIn) return setModalAttrs({ type: "log-in" });

    setModalAttrs({ type: "share", variables: { id: id } });
  };

  const postCommentsHandler = () => {
    if (!isLoggedIn) setModalAttrs({ type: "log-in" });
  };

  return (
    <Footer isMobile={isMobile || isModal}>
      {savedPostMutationDetails && savedPostMutationDetails.postId === id && (
        <SavedNotification details={savedPostMutationDetails} />
      )}
      <ButtonList>
        <Button style={{ marginLeft: "-8px" }} onClick={likeHandler}>
          {isLiked ? (
            <LikeAnimation
              isClicked={isClicked}
              onAnimationEnd={() => setIsClicked(false)}
            >
              <LikeSvg fill="rgb(237, 73, 86)" />
            </LikeAnimation>
          ) : (
            <UnLikeSvg />
          )}
        </Button>
        {!isModal || isLoggedIn ? (
          <>
            {isMobile ? (
              <PreloadLink
                to={`/p/${id}/comments/`}
                query={PreloadQuery.post}
                queryResult={resultPost}
                variables={{ postId: id }}
              >
                <Button>
                  <CommentSvg />
                </Button>
              </PreloadLink>
            ) : (
              <Link
                to={`/p/${id}`}
                state={{
                  background: location.pathname,
                  aspectRatio: photos[0].aspectRatio,
                }}
              >
                <Button>
                  <CommentSvg />
                </Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Button onClick={postCommentsHandler}>
              <CommentSvg />
            </Button>
          </>
        )}

        <Button onClick={sharePostHandler}>
          <SendSvg />
        </Button>
        <Save
          onMouseEnter={mouseEnterSaveHandler}
          onMouseLeave={mouseLeaveSaveHandler}
        >
          <SavedModalContainer
            isFlipped={saveButtonLocation && saveButtonLocation < 300}
          >
            {saveButtonLocation !== null && (
              <CollectionsModal
                setSaveButtonLocation={setSaveButtonLocation}
                isCollected={isCollected}
                postId={id}
                photoId={photos[0].id}
                isFlipped={saveButtonLocation < 300}
              />
            )}
          </SavedModalContainer>
          <Button
            onClick={savePostHandler}
            onTouchStart={touchDownHandler}
            onTouchEnd={touchEndHandler}
          >
            {isSaved ? <SaveSvg /> : <UnsaveSvg stroke="#262626" />}
          </Button>
        </Save>
      </ButtonList>
      <TextSection>
        {likeCount ? (
          <>
            {!isMobile ? (
              <button
                style={{ fontWeight: "600" }}
                onClick={() =>
                  setModalAttrs({ type: "post-likes", variables: { id: id } })
                }
              >
                {likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
              </button>
            ) : (
              <PreloadLink
                to={`/p/${id}/liked_by/`}
                query={PreloadQuery.postLikes}
                queryResult={resultPostLikes}
                variables={{ postId: id, limit: 16, skip: 0 }}
              >
                {likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
              </PreloadLink>
            )}
          </>
        ) : (
          <button>Be the first to like this.</button>
        )}
        {!isWide && (text || counts.comments > 2) && (
          <TextContainer>
            {text && (
              <Caption>
                <UsernameLink username={postedBy.username} isInline />{" "}
                <MoreText text={text} />
              </Caption>
            )}

            {counts.comments > 2 && (
              <CommentLink>
                {isMobile ? (
                  <CommentsPreload
                    to={`/p/${id}/comments/`}
                    query={PreloadQuery.post}
                    queryResult={resultPost}
                    variables={{ postId: id }}
                  >
                    {`View all ${counts.comments} comments`}
                  </CommentsPreload>
                ) : (
                  <CommentsPreload
                    to={`/p/${id}/`}
                    query={PreloadQuery.post}
                    queryResult={resultPost}
                    variables={{ postId: id }}
                    state={{ background: location.pathname }}
                  >
                    {`View all ${counts.comments} comments`}
                  </CommentsPreload>
                )}
              </CommentLink>
            )}
            {featuredComments.length !== 0 &&
              featuredComments.map((comment) => {
                return <FeaturedCommentItem {...comment} key={comment.id} />;
              })}
          </TextContainer>
        )}
        <SecondaryPreload
          to={`/p/${id}`}
          query={PreloadQuery.post}
          queryResult={resultPost}
          variables={{ postId: id, limit: 16, skip: 0 }}
        >
          <Time>{postDate(createdAt)}</Time>
        </SecondaryPreload>
      </TextSection>
    </Footer>
  );
};
