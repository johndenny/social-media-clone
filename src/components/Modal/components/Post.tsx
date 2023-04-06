import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "urql";
import { UniquePost } from "../../../graphQL/queries";
import { PostItem } from "../../PostItem";
import { PostModalPlaceholder } from "../../PostItemWide/PostModalPlaceholder";
import { BackDrop, PostAnimation } from "../styled";

interface Props {}

export const Post: React.FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [resultPost] = useQuery({
    query: UniquePost,
    variables: { postId: params.postId, limit: 16, skip: 0 },
  });

  return (
    <BackDrop onClick={() => navigate(-1)} isSecondary>
      <PostAnimation>
        {!resultPost.fetching && resultPost.data ? (
          <PostItem
            postValues={resultPost.data.uniquePost}
            isWide={true}
            isModal={true}
          />
        ) : (
          <PostModalPlaceholder />
        )}
      </PostAnimation>
    </BackDrop>
  );
};
