import React from "react";
import { MoreText } from "../../../MoreText";
import { ReactComponent as UnlikeSvg } from "../../../../assets/svgs/activity.svg";
import { ReactComponent as LikeSvg } from "../../../../assets/svgs/activitySelected.svg";
import { Container, TextContainer } from "./styled";
import { useMutation } from "urql";
import { CommentLike, CommentUnlike } from "../../../../graphQL/mutations";
import { UsernameLink } from "../../../UsernameLink";

type FeaturedCommentPropTypes = {
  id: string;
  postedBy: { username: string };
  text: string;
  isLiked: boolean;
};

interface Props extends FeaturedCommentPropTypes {}

export const FeaturedCommentItem: React.FC<Props> = ({
  id,
  postedBy,
  text,
  isLiked,
}) => {
  const [likeResult, likeMutation] = useMutation(CommentLike);
  const [unlikeResult, unlikeMutation] = useMutation(CommentUnlike);

  const likeHandler = () => {
    if (likeResult.fetching || unlikeResult.fetching) return;

    if (isLiked) return unlikeMutation({ commentId: id });
    likeMutation({ commentId: id });
  };

  return (
    <Container>
      <TextContainer>
        <UsernameLink username={postedBy.username} isInline />{" "}
        <span>
          <MoreText text={text} />
        </span>
      </TextContainer>
      <button onClick={likeHandler}>
        {isLiked ? (
          <LikeSvg height={12} width={12} fill="rgb(var(--error))" />
        ) : (
          <UnlikeSvg height={12} width={12} />
        )}
      </button>
    </Container>
  );
};
