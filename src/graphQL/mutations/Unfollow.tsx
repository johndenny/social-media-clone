export const Unfollow = `
  mutation($username: String!) {
    unfollow(username: $username) {
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
        photoVersion
        username
        fullName
        isFollowing
        counts {
          followedBy
          follows
        }
      }
    }
  }
`;
