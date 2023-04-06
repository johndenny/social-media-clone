import React, { useEffect } from "react";
import { useComments } from "..";
import { CommentItem } from "../../../../components/CommentItem";
import { Container } from "./styled";

interface Props {}

export const UniqueComment: React.FC<Props> = () => {
  const { resultUniqueComment } = useComments();
  const { comment } = resultUniqueComment?.data;

  return (
    <Container>
      <CommentItem comment={comment} uniqueReply={comment.uniqueReply} />
    </Container>
  );
};
