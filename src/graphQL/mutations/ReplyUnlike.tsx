export const ReplyUnlike = `
  mutation($replyId: String!) {
    replyUnlike(replyId: $replyId) {
      reply {
        id
        isLiked
        likeCount
      }
    }
  }
`;
