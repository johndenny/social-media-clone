export const FollowingPostsCounts = `
  query {
    followingPosts {
      __typename
      id
      counts {
        comments
        likes
      }
    }
  }
`;
