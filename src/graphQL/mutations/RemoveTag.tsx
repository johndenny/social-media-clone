export const RemoveTag = `
  mutation($postId: String!) {
    removeTag(postId: $postId) {
      __typename
      id
      photos {
        __typename
        id
        tags {
          __typename
          id
          User {
            __typename
            id
            username
          }
          x
          y
        }
      }
    }
  }
`;
