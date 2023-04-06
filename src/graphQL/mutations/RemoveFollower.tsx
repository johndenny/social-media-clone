export const RemoveFollower = `
  mutation($followerId: String!) {
    removeFollower(followerId: $followerId) {
      __typename
      id
      follower {
        __typename
        id
        username
        isFollowing
        counts {
          followedBy
          follows
        }
      }
      following {
        __typename
        id
        username
        isFollowing
        counts {
          follows
          followedBy
        }
      }
    }
  }
`;
