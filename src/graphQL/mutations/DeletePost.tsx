export const DeletePost = `
  mutation($postId: String!) {
    deletePost(postId: $postId) {
      __typename
      id
    }
  }
`;
