export const Tags = `
  query($username: String!, $limit: Int!, $skip: Int!) {
    tags(username: $username, limit: $limit, skip: $skip) {
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
`;
