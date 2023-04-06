export const ShowTag = `
  mutation($postId: String!) {
    showTag(postId: $postId) {
      __typename
      id
      isTagHidden
    }
  }  
`;
