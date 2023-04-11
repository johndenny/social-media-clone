export const Like = `
mutation($postId: String!) {
  like(postId: $postId) {
    __typename
    id
    isLiked
  }
}
`;
