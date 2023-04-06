export const ViewerCollections = `
  query($limit: Int!, $skip: Int!, $isSelection: Boolean) {
    collectionsPaged(limit: $limit, skip: $skip, isSelection: $isSelection) {
      __typename
      id
      isNextPage
      collections {
        __typename
        id
        name
        nameLink
        posts {
          __typename
          id
          text
          counts {
            comments
            likes
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
