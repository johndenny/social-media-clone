export const SavedPosts = `
  query($limit: Int!, $skip: Int!) {
    savedPostsPaged(limit: $limit, skip: $skip) {
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
