import React, { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { ProfileListPage } from "../../../components/ProfileListLinks/ProfileListPage";
import { globalContextType } from "../../../context/GlobalContext";
import { ReplyLikes } from "../../../graphQL/queries";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { Container } from "../LikedBy/styled";

interface Props {
  replyId?: string;
}

export const LikedByReplies: React.FC<Props> = ({ replyId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { isMobile, setHeaderAttrs } = useGlobalContext() as globalContextType;

  const { scrollDispatch, scrollRef, scrollState } = useInfinitePagination({
    limit: 16,
    type: replyId !== undefined ? "modal" : undefined,
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
              replyId: params.replyId || replyId,
            }}
            scrollDispatch={scrollDispatch}
            query={ReplyLikes}
            queryName={"uniqueReply"}
            pageName={"likes"}
          />
        );
      })}
    </Container>
  );
};
