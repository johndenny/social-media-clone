export const UniqueUserPostsGrid = `
  query($username: String!, $limit: Int!, $skip: Int!) {
    user(username: $username) {
      __typename
      id
      postsPage(limit: $limit, skip: $skip) {
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
