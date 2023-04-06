export const UnsavePost = `
mutation($postId: String!) {
  unsavePost(postId: $postId) {
    __typename
    id
    isSaved
  }
}
`;
