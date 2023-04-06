import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "urql";
import { globalContextType, PreloadQuery } from "../../context/GlobalContext";
import { RemoveReply, ReplyLike, ReplyUnlike } from "../../graphQL/mutations";
import useGlobalContext from "../../hooks/useGlobalContext";
import { commentDate } from "../../utils/DateFormat";
import { TextContainer, Time } from "../CaptionItem/styled";
import { ProfilePhoto } from "../ProfilePhoto";
import { TextLinkFilter } from "../TextLinkFilter";
import {
  Button,
  Container,
  Footer,
  LikeButton,
  Paragraph,
  SecondaryPreload,
} from "./styled";
import { ReactComponent as UnLikeSvg } from "../../assets/svgs/activity.svg";
import { ReactComponent as LikeSvg } from "../../assets/svgs/activitySelected.svg";
import { UsernameLink } from "../UsernameLink";
import { UserListI } from "../../types";

export type ReplyType = {
  id: string;
  commentId: string;
  createdAt: string;
  text: string;
  isLiked: boolean;
  likeCount: number;
  postedBy: UserListI;
};

interface Props {
  reply: ReplyType;
}

export const ReplyItem: React.FC<Props> = ({ reply }) => {
  const params = useParams();
  const { id, createdAt, text, postedBy, likeCount, isLiked, commentId } =
    reply;
  const {
    setModalAttrs,
    resultReplyLikes,
    viewer,
    setFooterMessage,
    setReplyVars,
    resultUniqueComment,
    resultComments,
    isMobile,
  } = useGlobalContext() as globalContextType;

  const [likeReplyResult, likeReplyMutation] = useMutation(ReplyLike);
  const [unlikeReplyResult, unlikeReplyMutation] = useMutation(ReplyUnlike);
  const [removeReply, removeReplyMutation] = useMutation(RemoveReply);

  const ModalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCountRef = useRef(0);

  const touchStartHandler = () => {
    clickCountRef.current += 1;
    const viewerId = viewer.data?.viewer.id;

    if (
      postedBy.id !== viewerId &&
      resultComments.data?.post.postedBy.id !== viewerId
    )
      return;
    ModalTimerRef.current = setTimeout(() => {
      setModalAttrs({
        type: "reply",
        variables: { id, removeReplyHandler },
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
    if (likeReplyResult.fetching || unlikeReplyResult.fetching) return;
    const variables = { replyId: id };
    if (isLiked) {
      return unlikeReplyMutation(variables).then((result) => {
        if (result.error) {
          setFooterMessage("Error unliking comment.");
        }
      });
    }

    likeReplyMutation(variables).then((result) => {
      if (result.error) {
        setFooterMessage("Error liking comment.");
      }
    });
  };

  const removeReplyHandler = (replyId: string) => {
    removeReplyMutation({ replyId }).then((result) => {
      if (result.error) setFooterMessage("Error removing reply");
      setModalAttrs(null);
    });
  };

  return (
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
              to={`/p/${params.postId}/comments/c/${commentId}/r/${id}`}
              query={PreloadQuery.uniqueComment}
              queryResult={resultUniqueComment}
              variables={{ commentId, replyId: id }}
            >
              <Time>{commentDate(createdAt)}</Time>
            </SecondaryPreload>
          ) : (
            <Link to={`/p/${params.postId}/c/${commentId}/r/${id}`}>
              <Time>{commentDate(createdAt)}</Time>
            </Link>
          )}
          {likeCount !== 0 && (
            <>
              {isMobile ? (
                <SecondaryPreload
                  to={`/p/${params.postId}/c/${commentId}/r/${id}/liked_by`}
                  query={PreloadQuery.replyLikes}
                  queryResult={resultReplyLikes}
                  variables={{ replyId: id, limit: 16, skip: 0 }}
                >{`${likeCount} ${
                  likeCount === 1 ? "like" : "likes"
                }`}</SecondaryPreload>
              ) : (
                <Button
                  onClick={() =>
                    setModalAttrs({ type: "reply-likes", variables: { id } })
                  }
                >{`${likeCount} ${likeCount === 1 ? "like" : "likes"}`}</Button>
              )}
            </>
          )}
          <Button
            onClick={() =>
              setReplyVars({ username: postedBy.username, commentId })
            }
          >
            Reply
          </Button>
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
  );
};
