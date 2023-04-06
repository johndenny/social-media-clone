export const ReplyLike = `
  mutation($replyId: String!) {
    replyLike(replyId: $replyId) {
      reply {
        id
        isLiked
        likeCount
      }
    }
  }
`;
