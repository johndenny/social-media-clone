export const RemoveReply = `
  mutation($replyId: String!) {
    deleteReply(replyId: $replyId) {
      __typename
      id
      commentId
    }
  }
`;
