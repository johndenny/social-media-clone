export const DeleteCollectionPosts = `
  mutation($postIds: [String!]!, $collectionId: String!) {
    deleteCollectionPosts(postIds: $postIds, collectionId: $collectionId) {
      __typename
      id
      isCollected
      isSaved
    }
  }
`;
