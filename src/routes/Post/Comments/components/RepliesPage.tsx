import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import {
  ReplyItem,
  ReplyType,
} from "../../../../components/CommentItem/ReplyItem";
import { Replies } from "../../../../graphQL/queries";
import {
  PageVariablesI,
  ScrollActionType,
} from "../../../../hooks/useInfinitePagination";
import { CommentListContainer } from "../styled";

interface ReplyPageVariablesI extends PageVariablesI {
  commentId: string;
}

interface Props {
  variables: ReplyPageVariablesI;
  pageDispatch: React.Dispatch<ScrollActionType>;
  setRepliesVisible: React.Dispatch<React.SetStateAction<number>>;
}

export const RepliesPage: React.FC<Props> = ({
  variables,
  pageDispatch,
  setRepliesVisible,
}) => {
  const params = useParams();
  const [resultReplies] = useQuery({
    query: Replies,
    variables,
  });
  const replyPage = resultReplies.data?.comment.replyPage;

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!resultReplies.data || !isFirstLoad.current) return;

    isFirstLoad.current = false;
    pageDispatch({ type: "fetching", payload: { isFetching: false } });

    if (!replyPage.isNextPage) pageDispatch({ type: "last-page" });

    setRepliesVisible((prevState) => prevState + replyPage.replies.length);
  }, [resultReplies.data]);

  return (
    <>
      {replyPage && (
        <CommentListContainer isWide={false}>
          {replyPage.replies.map((reply: ReplyType) => {
            if (reply.id === params.replyId) return <></>;
            return <ReplyItem key={reply.id} reply={reply} />;
          })}
        </CommentListContainer>
      )}
    </>
  );
};
