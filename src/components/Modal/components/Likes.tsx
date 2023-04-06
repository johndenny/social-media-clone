import React from "react";
import { globalContextType } from "../../../context/GlobalContext";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { LikedByComment } from "../../../routes/Post/Comments/LikedByComment";
import { LikedByReplies } from "../../../routes/Post/Comments/LikedByReplies";
import { LikedBy } from "../../../routes/Post/LikedBy";
import { HeaderMobile, RightHeaderButton } from "../../HeaderMobile";
import { BackDrop, Container } from "../styled";

interface Props {
  type: string;
  id: string;
}

export const Likes: React.FC<Props> = ({ type, id }) => {
  const { setModalAttrs } = useGlobalContext() as globalContextType;
  return (
    <BackDrop onClick={() => setModalAttrs(null)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <div style={{ height: "400px" }}>
          <HeaderMobile
            title="Likes"
            rightButton={RightHeaderButton.close}
            rightOnClick={() => setModalAttrs(null)}
          />
          {type === "post-likes" && <LikedBy postId={id} />}
          {type === "comment-likes" && <LikedByComment commentId={id} />}
          {type === "reply-likes" && <LikedByReplies replyId={id} />}
        </div>
      </Container>
    </BackDrop>
  );
};
