export const PopularUsers = `
  query($limit: Int!, $skip: Int!) {
    popularUsers(limit: $limit, skip: $skip) {
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
