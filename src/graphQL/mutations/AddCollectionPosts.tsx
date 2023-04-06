export const AddCollectionPosts = `
  mutation($postIds: [String!]!, $collectionId: String!) {
    addCollectionPosts(postIds: $postIds, collectionId: $collectionId) {
      __typename
      id
      isCollected
      isSaved
    }
  }
`;
