export const SuggestedUsers = `
  query($limit: Int!, $skip: Int!) {
    suggestedUsers(limit: $limit, skip: $skip) {
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
        isPrivate
        isRequested
        mutualFollowers {
          __typename
          id
          count
          users {
            __typename
            id
            username
          }
        }
      }
    }
  }
`;
