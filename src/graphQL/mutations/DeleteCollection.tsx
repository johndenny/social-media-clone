export const DeleteCollection = `
  mutation($collectionId: String!) {
    deleteCollection(collectionId: $collectionId) {
      __typename
      id
      isSaved
      isCollected
    }
  }
`;
