import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  CommentListContainer,
  MoreCommentsButton,
  MoreCommentsItem,
  SpinnerContainer,
} from "../../styled";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { CommentType } from "../..";
import { CommentItem } from "../../../../../components/CommentItem";
import { globalContextType } from "../../../../../context/GlobalContext";
import { Comments } from "../../../../../graphQL/queries";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import { ReactComponent as CirclePlusSvg } from "../../../../../assets/svgs/circlePlus.svg";
import {
  InitialStateType,
  ScrollActionType,
} from "../../../../../hooks/useInfinitePagination";
import { EmptyComments } from "../EmptyComments";
import { Spinner } from "../../../../../components/Spinner";

interface Props {
  isFirst: boolean;
  isLast: boolean;
  isWide: boolean;
  queryVars: { limit: number; skip: number };
  scrollRef?: React.RefObject<HTMLUListElement>;
  scrollTop?: number;
  pageState: InitialStateType;
  pageDispatch: React.Dispatch<ScrollActionType>;
  nextPage: () => void;
}

export const CommentsPage: React.FC<Props> = ({
  queryVars,
  isFirst,
  isLast,
  isWide,
  scrollTop,
  scrollRef,
  pageState,
  pageDispatch,
  nextPage,
}) => {
  const params = useParams();
  const { resultComments } = useGlobalContext() as globalContextType;

  const [resultMoreComments] = useQuery({
    query: Comments,
    variables: {
      postId: params.postId,
      limit: queryVars.limit,
      skip: queryVars.skip,
    },
  });

  const pageRef = useRef<HTMLUListElement>(null);
  const firstResult = isWide ? resultMoreComments : resultComments;
  const { data, fetching } = isFirst ? firstResult : resultMoreComments;
  const commentResults = data?.commentsPaged;

  useEffect(() => {
    if (commentResults && isWide)
      return pageDispatch({ type: "fetching", payload: { isFetching: false } });
    if (
      isLast &&
      commentResults &&
      pageRef.current &&
      scrollRef?.current &&
      pageState.isFetching &&
      scrollTop !== undefined
    ) {
      scrollRef.current.scrollTop =
        pageRef.current.clientHeight - (56 - scrollTop); // more comment button height: 56px
      pageDispatch({ type: "fetching", payload: { isFetching: false } });
    }
  }, [commentResults]);

  useEffect(() => {
    console.log({ firstResult });
  }, [firstResult]);

  if ((fetching || !data) && isFirst)
    return (
      <SpinnerContainer>
        <Spinner size="large" />
      </SpinnerContainer>
    );

  return (
    <CommentListContainer isWide={isWide} ref={pageRef}>
      {commentResults && (
        <>
          {isFirst && commentResults.comments.length === 0 ? (
            <EmptyComments />
          ) : (
            <>
              {commentResults.comments.map((comment: CommentType) => {
                if (comment.id === params.commentId) return null;
                return (
                  <ul key={comment.id}>
                    <CommentItem
                      scrollTop={scrollTop}
                      scrollRef={scrollRef}
                      comment={comment}
                    />
                  </ul>
                );
              })}
              {(pageState.isFetching || isLast) && commentResults.isNextPage && (
                <MoreCommentsItem>
                  <MoreCommentsButton onClick={nextPage}>
                    {pageState.isFetching ? (
                      <Spinner size="large" />
                    ) : (
                      <CirclePlusSvg />
                    )}
                  </MoreCommentsButton>
                </MoreCommentsItem>
              )}
            </>
          )}
        </>
      )}
    </CommentListContainer>
  );
};
