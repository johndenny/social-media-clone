import React, { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  globalContextType,
  PreloadQuery,
} from "../../../../context/GlobalContext";
import useGlobalContext from "../../../../hooks/useGlobalContext";
import { LeftHeaderButton } from "../../../../components/HeaderMobile";
import { useInfinitePagination } from "../../../../hooks/useInfinitePagination";
import { Container } from "../../LikedBy/styled";
import { ProfileListPage } from "../../../../components/ProfileListLinks/ProfileListPage";
import { CommentLikes } from "../../../../graphQL/queries";

interface Props {
  commentId?: string;
}

export const LikedByComment: React.FC<Props> = ({ commentId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { isMobile, setHeaderAttrs } = useGlobalContext() as globalContextType;

  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 16,
    type: commentId !== undefined ? "modal" : undefined,
  });

  useLayoutEffect(() => {
    if (!isMobile) return;

    setHeaderAttrs({
      leftButton: LeftHeaderButton.close,
      leftOnClick: () => navigate(-1),
      title: "Likes",
    });
  }, []);

  return (
    <Container ref={scrollRef}>
      {scrollState.moreVars.map((vars, index) => {
        return (
          <ProfileListPage
            key={index + vars.skip}
            variables={{
              ...vars,
              commentId: params.commentId || commentId,
            }}
            scrollDispatch={scrollDispatch}
            query={CommentLikes}
            queryName={"comment"}
            pageName={"likes"}
          />
        );
      })}
    </Container>
  );
};
