export const CommentLike = `
  mutation($commentId: String!) {
    commentLike(commentId: $commentId) {
      comment {
        id
        isLiked
        counts {
          likes
        }
      }
    }
  }
`;
