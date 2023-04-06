import React, { useEffect, useState } from "react";
import {
  Container,
  RepliesContainer,
  Spacer,
  ToggleButton,
  UniqueReply,
} from "./styled";
import { usePagination } from "../../hooks/usePagination";
import { RepliesPage } from "../../routes/Post/Comments/components/RepliesPage";
import useGlobalContext from "../../hooks/useGlobalContext";
import { globalContextType } from "../../context/GlobalContext";
import { ReplyItem, ReplyType } from "../CommentItem/ReplyItem";
import { Spinner } from "../Spinner";

interface Props {
  replyCount: number;
  commentId: string;
  uniqueReply?: ReplyType;
}

export const CommentReplies: React.FC<Props> = ({
  uniqueReply,
  replyCount,
  commentId,
}) => {
  const { newReplyCommentId, setNewReplyCommentId } =
    useGlobalContext() as globalContextType;
  const [isFirstPage, setIsFirstPage] = useState(true);
  const { nextPage, pageDispatch, pageState } = usePagination({
    limit: isFirstPage ? 3 : 12,
    isReply: true,
  });

  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [repliesVisible, setRepliesVisible] = useState(0);

  const nextPageHandler = () => {
    if (pageState.isLastPage)
      return setIsRepliesVisible((prevState) => (prevState ? false : true));
    if (isFirstPage) {
      setIsRepliesVisible(true);
      setIsFirstPage(false);
    }
    nextPage();
  };

  useEffect(() => {
    if (!newReplyCommentId || newReplyCommentId !== commentId) return;

    if (repliesVisible !== 0) setRepliesVisible((prevState) => prevState + 1);
    setNewReplyCommentId(undefined);
    nextPageHandler();
  }, [newReplyCommentId]);

  return (
    <Container>
      {uniqueReply && (
        <UniqueReply>
          <ReplyItem reply={uniqueReply} />
        </UniqueReply>
      )}

      {replyCount !== 0 && (
        <li>
          <ToggleButton onClick={nextPageHandler}>
            <Spacer></Spacer>
            {replyCount - repliesVisible ? (
              <span>{`View replies (${replyCount - repliesVisible})`}</span>
            ) : (
              <span>
                {isRepliesVisible
                  ? "Hide replies"
                  : `View replies (${replyCount})`}
              </span>
            )}
            {pageState.isFetching && <Spinner size={"small"} />}
          </ToggleButton>
        </li>
      )}
      {pageState.moreVars.length !== 0 && (
        <RepliesContainer isRepliesVisible={isRepliesVisible}>
          {pageState.moreVars
            .map((vars) => {
              return (
                <RepliesPage
                  key={commentId + vars.limit + vars.skip}
                  variables={{ ...vars, commentId }}
                  pageDispatch={pageDispatch}
                  setRepliesVisible={setRepliesVisible}
                />
              );
            })
            .reverse()}
        </RepliesContainer>
      )}
    </Container>
  );
};
