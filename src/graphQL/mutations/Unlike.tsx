export const Unlike = `
mutation($postId: String!) {
  unlike(postId: $postId) {
    __typename
    id
    isLiked
    likeCount
  }
}
`;
