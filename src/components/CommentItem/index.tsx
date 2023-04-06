import React, { useLayoutEffect, useRef, useState } from "react";

import {
  Button,
  Container,
  Footer,
  LikeButton,
  OptionsContainer,
  Paragraph,
  SecondaryPreload,
} from "./styled";

import { commentDate } from "../../utils/DateFormat";
import { TextContainer, Time } from "../CaptionItem/styled";
import { ProfilePhoto } from "../ProfilePhoto";
import { ReactComponent as UnLikeSvg } from "../../assets/svgs/activity.svg";
import { ReactComponent as LikeSvg } from "../../assets/svgs/activitySelected.svg";
import { useMutation } from "urql";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";
import { TextLinkFilter } from "../TextLinkFilter";
import {
  CommentLike,
  CommentUnlike,
  RemoveComment,
} from "../../graphQL/mutations";
import { CommentType } from "../../routes/Post/Comments";
import { CommentReplies } from "../CommentReplies";
import { ReplyType } from "./ReplyItem";
import { UsernameLink } from "../UsernameLink";
import { ReactComponent as OptionsDotsSvg } from "../../assets/svgs/optionsDots.svg";
import { Link } from "react-router-dom";

interface Props {
  comment: CommentType;
  uniqueReply?: ReplyType;
  scrollRef?: React.RefObject<HTMLUListElement>;
  scrollTop?: number;
}

export const CommentItem = React.memo(function CommentItem({
  comment,
  scrollRef,
  scrollTop,
  uniqueReply,
}: Props) {
  const { id, createdAt, text, postedBy, counts, isLiked, post } = comment;
  const params = useParams();
  const {
    setModalAttrs,
    resultCommentLikes,
    viewer,
    setFooterMessage,
    setReplyVars,
    resultUniqueComment,
    resultComments,
    isMobile,
  } = useGlobalContext() as globalContextType;
  const viewerId = viewer.data?.viewer.id;
  const [likeCommentResult, likeCommentMutation] = useMutation(CommentLike);
  const [unlikeCommentResult, unlikeCommentMutation] =
    useMutation(CommentUnlike);
  const [resultRemoveComment, removeCommentMutation] =
    useMutation(RemoveComment);

  const ModalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCountRef = useRef(0);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [isRepliesClicked, setIsRepliesClicked] = useState(false);
  const isLoggedIn = Boolean(viewer.data);

  const touchStartHandler = () => {
    clickCountRef.current += 1;
    const viewerId = viewer.data?.viewer.id;

    if (
      postedBy.id !== viewerId ||
      resultComments.data?.uniquePost.postedBy.id !== viewerId
    )
      return;
    ModalTimerRef.current = setTimeout(() => {
      setModalAttrs({
        type: "comment",
        variables: { id: id, removeCommentHandler },
      });
      clickCountRef.current = 0;
    }, 600);
  };

  const touchMoveHandler = () => {
    if (ModalTimerRef.current) clearTimeout(ModalTimerRef.current);
  };

  const touchEndHandler = () => {
    if (ModalTimerRef.current) clearTimeout(ModalTimerRef.current);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 300);
    if (clickCountRef.current === 2) {
      if (isLiked) likeHandler();
      clickCountRef.current = 0;
    }
  };

  const likeHandler = () => {
    if (!isLoggedIn) return setModalAttrs({ type: "log-in" });

    if (likeCommentResult.fetching || unlikeCommentResult.fetching) return;
    const variables = { commentId: comment?.id };
    if (isLiked) {
      return unlikeCommentMutation(variables).then((result) => {
        if (result.error) {
          setFooterMessage("Error unliking comment.");
        }
      });
    }

    likeCommentMutation(variables).then((result) => {
      if (result.error) {
        setFooterMessage("Error liking comment.");
      }
    });
  };

  const removeCommentHandler = (commentId: string) => {
    removeCommentMutation({ commentId }).then((result) => {
      if (result.error) setFooterMessage("Error removing comment");
      setModalAttrs(null);
    });
  };

  useLayoutEffect(() => {
    if (scrollRef?.current && scrollTop && isRepliesClicked) {
      setIsRepliesClicked(false);
      scrollRef.current.scrollTop = scrollTop;
    }
  }, [isRepliesVisible]);

  const replyHandler = () => {
    if (!isLoggedIn) return setModalAttrs({ type: "log-in" });

    setReplyVars({ username: postedBy.username, commentId: id });
  };

  return (
    <>
      <Container
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
      >
        <ProfilePhoto
          height="32px"
          photoVersion={postedBy.photoVersion}
          id={postedBy.id}
          username={postedBy.username}
        />
        <TextContainer>
          <Paragraph>
            <UsernameLink username={postedBy.username} isInline />{" "}
            <TextLinkFilter text={text} />
          </Paragraph>
          <Footer>
            {isMobile ? (
              <SecondaryPreload
                to={`/p/${params.postId}/comments/c/${id}`}
                query={PreloadQuery.uniqueComment}
                queryResult={resultUniqueComment}
                variables={{ commentId: id, replyId: "" }}
              >
                <Time>{commentDate(createdAt)}</Time>
              </SecondaryPreload>
            ) : (
              <Link to={`/p/${params.postId}/c/${id}`}>
                <Time>{commentDate(createdAt)}</Time>
              </Link>
            )}
            {counts.likes !== 0 && (
              <>
                {isMobile ? (
                  <SecondaryPreload
                    to={`/p/${params.postId}/c/${id}/liked_by`}
                    query={PreloadQuery.commentLikes}
                    queryResult={resultCommentLikes}
                    variables={{ commentId: id, limit: 16, skip: 0 }}
                  >{`${counts.likes} ${
                    counts.likes === 1 ? "like" : "likes"
                  }`}</SecondaryPreload>
                ) : (
                  <Button
                    onClick={() =>
                      setModalAttrs({
                        type: "comment-likes",
                        variables: { id },
                      })
                    }
                  >{`${counts.likes} ${
                    counts.likes === 1 ? "like" : "likes"
                  }`}</Button>
                )}
              </>
            )}
            <Button isBold onClick={replyHandler}>
              Reply
            </Button>
            {!isMobile &&
              (viewerId === post.postedBy.id || viewerId === postedBy.id) && (
                <div>
                  <OptionsContainer>
                    <Button
                      style={{ padding: "8px" }}
                      onClick={() =>
                        setModalAttrs({
                          type: "comment",
                          variables: { id, removeCommentHandler },
                        })
                      }
                    >
                      <OptionsDotsSvg
                        fill="rgb(var(--secondary-text))"
                        height={24}
                        width={24}
                      />
                    </Button>
                  </OptionsContainer>
                </div>
              )}
          </Footer>
        </TextContainer>
        <LikeButton onClick={likeHandler}>
          {isLiked ? (
            <LikeSvg height={12} width={12} fill="rgb(var(--error))" />
          ) : (
            <UnLikeSvg height={12} width={12} />
          )}
        </LikeButton>
      </Container>
      {counts.replies !== 0 && (
        <CommentReplies
          replyCount={counts.replies}
          commentId={id}
          uniqueReply={uniqueReply}
        />
      )}
    </>
  );
});
