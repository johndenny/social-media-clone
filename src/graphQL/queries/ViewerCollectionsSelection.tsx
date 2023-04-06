export const ViewerCollectionsSelection = `
  query($limit: Int!, $skip: Int!, $postId: String, $isSelection: Boolean) {
    collectionsPaged(limit: $limit, skip: $skip, isSelection: $isSelection) {
      __typename
      id
      isNextPage
      collections {
        __typename
        id
        name
        nameLink
        isCollected(postId: $postId)
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
