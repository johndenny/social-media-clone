export const ExplorePosts = `
  query($limit: Int!, $skip: Int!) {
    explorePosts(limit: $limit, skip: $skip) {
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
          aspectRatio
          id
        }
      }
    }
  }
`;
