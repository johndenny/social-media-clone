export const RemoveComment = `
  mutation($commentId: String!) {
    deleteComment(commentId: $commentId) {
      __typename
      id
    }
  }
`;
