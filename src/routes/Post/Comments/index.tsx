import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

import { List, ListContainer } from "./styled";

import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { UseQueryState } from "urql";
import { CaptionItem } from "../../../components/CaptionItem";
import {
  globalContextType,
  PreloadQuery,
} from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { CommentInput } from "./components/CommentInput";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { usePagination } from "../../../hooks/usePagination";
import { CommentsPage } from "./components/CommentsPage";
import { ReplyType } from "../../../components/CommentItem/ReplyItem";
import { UserListI } from "../../../types";
import { PostValues } from "../../../components/PostItem";

const LIMIT = 16;

export type CommentType = {
  id: string;
  createdAt: string;
  text: string;
  postedBy: UserListI;
  counts: { likes: number; replies: number };
  isLiked: boolean;
  replies: ReplyType[];
  post: { postedBy: UserListI };
};

export type CommentContextType = {
  resultUniqueComment: UseQueryState<any, string>;
};

export interface PostCaptionI {
  createdAt: string;
  id: string;
  photoVersion: number;
  username: string;
  text: string;
}

interface Props {
  isWide: boolean;
  wideScrollRef?: React.RefObject<HTMLUListElement>;
  passedPost?: PostValues;
}

export const Comments: React.FC<Props> = ({
  isWide,
  wideScrollRef,
  passedPost,
}) => {
  const params = useParams();
  const {
    setHeaderAttrs,
    queryVarsDispatch,
    resultPost,
    resultComments,
    resultUniqueComment,
  } = useGlobalContext() as globalContextType;

  const { data, fetching, error } = resultPost;
  const post = data?.uniquePost;

  const { nextPage, pageDispatch, pageState } = usePagination({
    limit: 16,
  });

  const pages = isWide ? pageState.moreVars : [...pageState.moreVars].reverse();

  const mobileScrollRef = useRef<HTMLUListElement>(null);
  const scrollRef = wideScrollRef || mobileScrollRef;
  const [scrollTop, setScrollTop] = useState(0);
  const [isFirstLoad, setisFirstLoad] = useState(true);

  const pageProps = {
    isWide,
    scrollTop,
    scrollRef,
    pageState,
    pageDispatch,
    nextPage,
  };
  const firstPageProps = {
    ...pageProps,
    isFirst: true,
    isLast: pageState.moreVars.length === 0,
    queryVars: { limit: 16, skip: 0 },
  };

  useLayoutEffect(() => {
    if (isWide) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.backChevron,
      title: "Comments",
    });
  }, []);

  useEffect(() => {
    if (params.commentId)
      queryVarsDispatch({
        type: "add",
        payload: {
          query: PreloadQuery.uniqueComment,
          variables: {
            commentId: params.commentId,
            replyId: params.replyId ? params.replyId : "",
          },
        },
      });
  }, [params]);

  useEffect(() => {
    queryVarsDispatch({
      type: "add",
      payload: {
        query: PreloadQuery.comments,
        variables: { postId: params.postId, limit: LIMIT, skip: 0 },
      },
    });
  }, []);

  useLayoutEffect(() => {
    if (
      !isWide &&
      isFirstLoad &&
      scrollRef.current &&
      resultComments.data &&
      !params.commentId
    ) {
      setisFirstLoad(false);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      return;
    }
  }, [resultComments.data]);

  useLayoutEffect(() => {
    if (params.commentId && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [params.commentId]);

  return (
    <>
      {!isWide && <CommentInput scrollRef={scrollRef} />}
      <ListContainer>
        <List
          ref={scrollRef}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
          {post?.text && !passedPost && <CaptionItem post={post} />}
          {passedPost?.text && <CaptionItem post={passedPost} />}

          {resultUniqueComment.data && (
            <Outlet
              context={{
                resultUniqueComment,
              }}
            />
          )}

          {isWide && <CommentsPage {...firstPageProps} />}

          {pages.map((vars, index, varsArray) => {
            return (
              <CommentsPage
                isFirst={false}
                isLast={isWide ? index === pages.length - 1 : index === 0}
                queryVars={vars}
                {...pageProps}
              />
            );
          })}

          {!isWide && <CommentsPage {...firstPageProps} />}
        </List>
      </ListContainer>
    </>
  );
};

export function useComments() {
  return useOutletContext<CommentContextType>();
}
