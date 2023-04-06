export const Follow = `
  mutation($username: String!) {
    follow(username: $username) {
      __typename
      id
      follower {
        __typename
        id
        isFollowing
        username
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
