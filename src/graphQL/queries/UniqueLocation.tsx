export const UniqueLocation = `
  query($locationId: Int!, $limit: Int!, $skip: Int!) {
    location(locationId: $locationId) {
      __typename
      id
      name
      lat
      lon
      PostCount
      pagedPosts(limit: $limit, skip: $skip) {
        __typename
        id
        isNextPage
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
