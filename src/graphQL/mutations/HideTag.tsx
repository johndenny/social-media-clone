export const HideTag = `
  mutation($postId: String!) {
    hideTag(postId: $postId) {
      __typename
      id
      isTagHidden
    }
  }
`;
