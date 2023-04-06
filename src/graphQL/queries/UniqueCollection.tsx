export const UniqueCollection = `
  query($collectionId: String!, $limit: Int!, $skip: Int!) {
    uniqueCollection(collectionId: $collectionId) {
      __typename
      id
      name
      nameLink
      pagedPosts(limit: $limit, skip: $skip) {
        __typename
        id
        isNextPage
        posts {
          __typename
          id
          text
          counts {
            likes
            comments
          }
          photos {
            __typename
            id
            aspectRatio
          }
        }
      }
    }
  }
`;
