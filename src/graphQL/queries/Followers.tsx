export const Followers = `
  query($username: String!, $limit: Int!, $skip: Int!) {
    followers(username: $username, limit: $limit, skip: $skip) {
      __typename
      id
      isNextPage
      profiles {
        __typename
        id
        photoVersion
        username
        fullName
        isFollowing
        isRequested
        isPrivate
      }
    }
  }
`;
