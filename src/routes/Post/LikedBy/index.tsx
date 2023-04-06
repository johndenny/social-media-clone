import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { LeftHeaderButton } from "../../../components/HeaderMobile";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { ProfileListPage } from "../../../components/ProfileListLinks/ProfileListPage";
import { PostLikes } from "../../../graphQL/queries";
import { Container } from "./styled";

interface Props {
  postId?: string;
}

export const LikedBy: React.FC<Props> = ({ postId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { isMobile, setHeaderAttrs } = useGlobalContext() as globalContextType;

  const { scrollRef, scrollDispatch, scrollState } = useInfinitePagination({
    limit: 16,
    type: postId !== undefined ? "modal" : undefined,
  });

  useEffect(() => {
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
            variables={{ ...vars, postId: params.postId || postId }}
            scrollDispatch={scrollDispatch}
            query={PostLikes}
            queryName={"uniquePost"}
            pageName={"likes"}
          />
        );
      })}
    </Container>
  );
};
