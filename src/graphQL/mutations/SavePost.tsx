export const SavePost = `
mutation($postId: String!) {
  savePost(postId: $postId) {
    __typename
    id
    isSaved
    text
    counts {
      likes
      comments
    }
    photos {
      aspectRatio
      id
    }
  }
}
`;
