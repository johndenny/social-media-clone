export const SavePost = `
mutation($postId: String!) {
  savePost(postId: $postId) {
    __typename
    id
    isSaved
  }
}
`;
