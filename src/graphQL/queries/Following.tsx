export const Following = `
  query($username: String!, $limit: Int!, $skip: Int!) {
    following(username: $username, limit: $limit, skip: $skip) {
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
      }
    }
  }
`;
