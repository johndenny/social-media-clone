export const CreateCollection = `
  mutation($name: String!, $newPostId: String, $savedPostIds: [String!]) {
    createCollection(name: $name, newPostId: $newPostId, savedPostIds: $savedPostIds) {
      collection {
        __typename
        id
        name
        nameLink
      }
      posts {
        __typename
        id
        isCollected
        isSaved
      }
    }
  }
`;
