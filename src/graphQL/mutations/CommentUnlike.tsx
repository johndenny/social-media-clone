export const CommentUnlike = `
  mutation($commentId: String!) {
    commentUnlike(commentId: $commentId) {
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
